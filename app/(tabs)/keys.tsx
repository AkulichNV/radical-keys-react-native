import { StyleSheet, Pressable, FlatList, ListRenderItem, Dimensions, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import dataKeys from '@/assets/data/radicalKeys.json';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { groupCharactersByStrokes } from '@/scripts/groupCharactersByStrokes';
import { RadicalKeys } from '@/types/RadicalKeys';
import { findCharacterById } from '@/scripts/findCharacterById';
import { useDataContext } from '@/context/KeyContext';
import ParallaxFlatList from '@/components/ParallaxFlatList';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Calculate the number of columns based on screen width
const isTablet = windowWidth >= 768;
const numColumns = isTablet ? (windowWidth > windowHeight ? 12 : 8) : (windowWidth > windowHeight ? 7 : 6);
const ITEM_WIDTH = isTablet ? 80 : 50;
const ITEM_MARGIN = isTablet ? 15 : 10;

export default function KeysScreen() {
  const router = useRouter();
  const [radicalKeys, setRadicalKeys] = useState<Record<number, RadicalKeys[]>>({});
  const { setData } = useDataContext();


  useEffect(() => {
    const groupedKeys = groupCharactersByStrokes(dataKeys.radicalKeys);
    setRadicalKeys(groupedKeys);
  }, []);

  function onHanzi(number: number) {
    const radicalKey = findCharacterById(dataKeys.radicalKeys, number)
    setData(radicalKey);
    router.push({
          pathname: '/keys/[key]',
          params: { key: number, from: 'keys' },
        });
  }

  const strokeCounts = Array.from({ length: 17 }, (_, index) => index + 1);

  const renderStrokeSection = ({ item }: {item: number }) => (
    <ThemedView >
      <ThemedText type="subtitle" style={styles.subtitle}>
        Черт в знаке: {item} (всего таких {radicalKeys[item]?.length || 0})
      </ThemedText>
      <FlatList
        key={numColumns}
        data={radicalKeys[item] || []}
        keyExtractor={(item) => item.unicode.toString()}
        ListEmptyComponent={
          <ThemedText type="defaultSemiBold">Нет иероглифов</ThemedText>
        }
        renderItem={({ item: keys }) => (
          <Pressable onPress={() => onHanzi(keys.number)}>
            <ThemedView style={styles.character}>
              <ThemedText type="subtitle" style={styles.characterText}>{keys.hanzi}</ThemedText>
            </ThemedView>
          </Pressable>
        )}
        numColumns={numColumns} // Number of columns for wrapping
        columnWrapperStyle={styles.rowWrapper} // Styling for rows
        showsHorizontalScrollIndicator={false}
      />
    </ThemedView>
  );

  return (
    <ParallaxFlatList
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#010606' }}
      headerImage={
          <Image
            source={require('@/assets/images/background1.jpg')}
            style={styles.headerImage}
          />
      }
      title={'Иероглифические ключи'}
      data={strokeCounts}
      renderItem={renderStrokeSection}
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 250,
    width: '100%',
    resizeMode: "contain",
  },
  subtitle: {
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 9,
    flexWrap: 'wrap',
    paddingBottom: 10,
    paddingTop: 8
  },
  rowWrapper: {
    gap: ITEM_MARGIN,
    marginBottom: ITEM_MARGIN,
  },
  character: {
    flex: 1,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#272f3a',
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    backgroundColor: '#010606',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  characterText: {
    textAlign: 'center',
  }
});
