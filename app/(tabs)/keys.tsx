import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RadicalKeys } from '@/types/RadicalKeys';
import { groupCharactersByStrokes } from '@/scripts/groupCharactersByStrokes';
import dataKeys from '../../assets/data/radicalKeys.json';

export default function KeysScreen() {
  const [radicalKeys, setRadicalKeys] = useState<Record<number, RadicalKeys[]>>({});

  useEffect(() => {
    const groupedKeys = groupCharactersByStrokes(dataKeys.radicalKeys);
    setRadicalKeys(groupedKeys);
  }, []);

  function onHanzi(number: number) {
    return console.log('tap', number);
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<AntDesign size={310} name="zhihu" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Таблица иероглифических ключей</ThemedText>
      </ThemedView>

      <ThemedView>
      {Array.from({ length: 17 }, (_, index) => index + 1).map((strokeCount) => (
        <ThemedView key={strokeCount} >
          <ThemedText type="subtitle">Кол-во черт: {strokeCount} ({radicalKeys[strokeCount]?.length || 0})</ThemedText>
          <ThemedView style={styles.titleContainer}>
            {radicalKeys[strokeCount]?.map((keys) => (
              <Pressable 
              key={keys.unicode} 
              onPress={() => onHanzi(keys.number)}
            >
              <ThemedText type="cell">{keys.hanzi}</ThemedText>
            </Pressable>
            )) || <ThemedText type="defaultSemiBold">Нет иероглифов</ThemedText>}
          </ThemedView>
          </ThemedView>
      ))}
    </ThemedView>
    
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
