import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

import { sounds } from '@/assets/sounds/sounds';
import { EtymologyView } from '@/components/EtymologyView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SlideLayout } from '@/components/SlideLayout';
import { TopBar } from '@/components/TopBar';
import { DescriptionView } from '@/components/DescriptionView';
import { StrokeOrder } from '@/components/StrokeOrder';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Evolution } from '@/types/Evolution';
import { Calligraphy } from '@/types/Calligraphy';
import { useDataContext } from '@/context/KeyContext';
import SvgRenderer from '@/components/SvgRenderer';
import * as Svgs from '@/assets/images/svgs/svgs';

export default function DetailsScreen() {
  const { key } = useLocalSearchParams();
  const router = useRouter();

  const { data } = useDataContext();
  const radicalKey = data;

  const [valueText, setValueText] = useState('Определение');
  const [sound, setSound] = useState<Audio.Sound | undefined>();

  async function playSound() {
    const soundSource = radicalKey?.sound as string;
    const soundPath = sounds[soundSource];
    const { sound } = await Audio.Sound.createAsync(soundPath);
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  function RenderSelectedContent(value: string) {
    switch (value) {
      case 'Определение':
        return <DescriptionView description={radicalKey.description.long}/>
      case 'Порядок черт':
        return (
          <ThemedView>
            {radicalKey.calligraphy.map((item: Calligraphy, index: number) => (
              <StrokeOrder
                key={index}
                gifSource={item.gif}
                svgSource={item.svg}
                strokeOrder={item.strokeOrder}
              />
            ))}
          </ThemedView>
        );
      case 'Этимология':
        return (
          <ThemedView>
            {radicalKey.evolution.map((item: Evolution, index: number) => (
              <EtymologyView
                key={index}
                svg={radicalKey.unicode}
                images={item.image} 
                title={item.title}
              />
            ))}
          </ThemedView>
        );
      default:
        return <ThemedText type="subtitle">{value}</ThemedText>;
    }
  }

  return (
    <ScrollView>
      <Stack.Screen options={{ title: `keys/${key}` }} />
      <ThemedView style={styles.container}>
        <TopBar onPress={()=>{
          router.push('/keys');
          setValueText('Определение');
          }} 
          title={key} style={styles.topBar} />
        <ThemedView style={styles.header}>
          <ImageBackground 
            source={require('@/assets/images/z200.png')} 
            style={styles.grid}
            resizeMode="cover"
          >
            <SvgRenderer svgName={radicalKey.calligraphy[0]?.svg  as string} svgModule={Svgs} />
          </ImageBackground>
          <ThemedView style={styles.description}>
          <Pressable onPress={playSound}>
            <ThemedText type="subtitle">{radicalKey.pinyin}{' '}
              <AntDesign name="sound" size={18} color="white" />
            </ThemedText>
          </Pressable>
          <ThemedText type="subtitle">{radicalKey.hanzi} = {radicalKey.description.short}</ThemedText>
          </ThemedView>
        </ThemedView>
        <SlideLayout 
        values={['Определение', 'Порядок черт', 'Этимология']}
        selectedValue={valueText}
        setSelectedValue={setValueText}
        >
          {RenderSelectedContent(valueText)}
        </SlideLayout>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexGrow: 1 
  },
  topBar: {

  },
  header: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  description: {
    flex: 1,
    textAlign: 'center'
  },
  grid: {
    width: 100,
    height: 100,
  },
  overlayGif: {
    width: 100,
    height: 100,
  }
});