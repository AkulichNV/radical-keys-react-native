import { StyleSheet, Pressable, FlatList, ListRenderItem, Dimensions, useWindowDimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import dataKeys from '@/assets/data/radicalKeys.json';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { groupCharactersByStrokes } from '@/scripts/groupCharactersByStrokes';
import { RadicalKeys } from '@/types/RadicalKeys';
import { findCharacterById } from '@/scripts/findCharacterById';
import { useDataContext } from '@/context/KeyContext';

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



  const renderStrokeSection: ListRenderItem<number> = ({ item: strokeCount }) => (
    <ThemedView >
      <ThemedText type="subtitle">
        Кол-во черт: {strokeCount} ({radicalKeys[strokeCount]?.length || 0})
      </ThemedText>
      <FlatList
        key={numColumns}
        data={radicalKeys[strokeCount] || []}
        keyExtractor={(item) => item.unicode.toString()}
        ListEmptyComponent={
          <ThemedText type="defaultSemiBold">Нет иероглифов</ThemedText>
        }
        renderItem={({ item: keys }) => (
          <Pressable onPress={() => onHanzi(keys.number)}>
            <ThemedView style={styles.character}>
              <ThemedText type="subtitle">{keys.hanzi}</ThemedText>
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
    <ThemedView style={{ flex : 1 }}>
      <FlatList
        data={strokeCounts}
        keyExtractor={(item) => item.toString()}
        renderItem={renderStrokeSection}
        ListHeaderComponent={
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Иероглифические ключи</ThemedText>
          </ThemedView>
        }
        showsHorizontalScrollIndicator={false}
      />
    </ThemedView>
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
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ECEDEE',
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
  }
});
