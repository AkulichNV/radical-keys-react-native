import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

import { sounds } from '@/assets/sounds/sounds';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SlideLayout } from '@/components/SlideLayout';
import { TopBar } from '@/components/TopBar';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDataContext } from '@/context/KeyContext';
import SvgRenderer from '@/components/SvgRenderer';
import * as Svgs from '@/assets/images/svgs/svgs';
import { RenderSelectedContent } from '@/components/tabsContent/RenderSelectedContent';

export default function DetailsScreen() {
  const { key, from } = useLocalSearchParams();
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

  return (
    <ScrollView>
      <Stack.Screen options={{ title: `keys/${key}` }} />
      <ThemedView style={styles.container}>
        <TopBar onPress={()=>{
          if (from === 'keys') {
            router.push('/keys');
          } else if (from === 'table') {
            router.push('/table');
          }
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
          <RenderSelectedContent value={valueText} radicalKey={radicalKey} />
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