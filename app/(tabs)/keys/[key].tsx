import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

import { sounds } from '@/assets/sounds/sounds';
import { ThemedView } from '@/components/ThemedView';
import { SlideLayout } from '@/components/SlideLayout';
import { TopBar } from '@/components/TopBar';
import { RenderSelectedContent } from '@/components/selectedContent/RenderSelectedContent';
import { useDataContext } from '@/context/KeyContext';
import { KeyHeader } from '@/components/KeyHeader';
import { ModalDialog } from '@/components/ModalDialog';
import { ThemedText } from '@/components/ThemedText';
import { DescriptionView } from '@/components/selectedContent/DescriptionView';


export default function DetailsScreen() {
  const { key, from } = useLocalSearchParams();
  const router = useRouter();

  const { data } = useDataContext();
  const radicalKey = data;

  const [valueText, setValueText] = useState<string>('Определение');
  const [sound, setSound] = useState<Audio.Sound | undefined>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onModalOpen = () => {
    setIsModalVisible(true);
  };

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
            setValueText('Определение');
          }} 
          title={radicalKey.hanzi}  
        />
        <KeyHeader 
          svgName={radicalKey.calligraphy[0]?.svg}
          playSound={onPlaySound}
          descriptionOpenModal={onModalOpen}
          number={radicalKey.number}
          pinyin={radicalKey.pinyin}
          description={radicalKey.description.short}
        />
        <SlideLayout 
        values={['Определение', 'Порядок черт', 'Этимология']}
        selectedValue={valueText}
        setSelectedValue={setValueText}
        >
          <RenderSelectedContent value={valueText} radicalKey={radicalKey} />
        </SlideLayout>
        <ModalDialog isVisible={isModalVisible} onClose={onModalClose}>
          <DescriptionView description={radicalKey.description.long} />
        </ModalDialog>
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