import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, useColorScheme, ImageSourcePropType } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Audio } from 'expo-av';

import { sounds } from '@/assets/sounds/sounds';
import { ThemedView } from '@/components/ThemedView';
import { TopBar } from '@/components/TopBar';
import { KeyHeader } from '@/components/KeyHeader';
import { ModalDialog } from '@/components/ModalDialog';
import { DescriptionView } from '@/components/DescriptionView';
import { ContentView } from '@/components/selectedContent/ContentView';
import { useDataContext } from '@/context/KeyContext';
import { useNavigateToRadical } from '@/hooks/useNavigateToRadical';

export default function DetailsScreen() {
  const { key, from } = useLocalSearchParams();
  const router = useRouter();

  const { data } = useDataContext();
  const radicalKey = data;

  const [sound, setSound] = useState<Audio.Sound | undefined>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isStrokeOrder, setIsStrokeOrder] = useState<boolean>(true);

  const navigateToRadical = useNavigateToRadical();

  const colorScheme = useColorScheme();

  const backgroundMap: { [key: string]: ImageSourcePropType } = {
    light: require('@/assets/images/lightGridBackground.png'),
    dark: require('@/assets/images/darkGridBackground.png'),
  };

  const backgroundImage = backgroundMap[colorScheme || 'light'];
  const svgColorKey = colorScheme === 'dark' ? '#ffffff' : '#000000';
  const svgColorIcon = colorScheme === 'dark' ? '#272f3a' : '#dbcec4';
  const backgroundColorPress = colorScheme === 'dark' ? '#000000' : '#fffbf5';

  async function onPlaySound() {
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
        <TopBar 
          onPressBack={()=>{
            if (from === 'keys') {
              router.push('/keys');
            } else if (from === 'table') {
              router.push('/table');
            }
            setIsStrokeOrder(true);
          }} 
          title={radicalKey.hanzi}  
        />
        {radicalKey.calligraphy[0].svg && 
        <>
          <KeyHeader
            svgName={radicalKey.calligraphy[0]?.svg}
            gridBackgroundImage={backgroundImage}
            svgColorKey={svgColorKey}
            svgColorIcon={svgColorIcon}
            backgroundColorPress={backgroundColorPress}
            playSound={onPlaySound}
            descriptionOpenModal={() => setIsModalVisible(true)}
            onPressLeft={() => navigateToRadical(radicalKey.number - 1, from)}
            onPressRight={() => navigateToRadical(radicalKey.number + 1, from)}
            number={radicalKey.number}
            pinyin={radicalKey.pinyin}
            description={radicalKey.description.short} />
            <ContentView
              isStrokeOrder={isStrokeOrder}
              strokeOrder={() => setIsStrokeOrder(true)}
              etymology={() => setIsStrokeOrder(false)}
              calligraphy={radicalKey.calligraphy}
              evolution={radicalKey.evolution}
              unicode={radicalKey.unicode} 
              backgroundColorPress={backgroundColorPress}
              backgroundActive={svgColorIcon}
            />
            <ModalDialog isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} title={"Значение иероглифа"}>
              <DescriptionView description={radicalKey.description.long} />
            </ModalDialog>
          </> }
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
});