import { StyleSheet, Pressable, FlatList, Dimensions, useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';

import dataKeys from '@/assets/data/radicalKeys.json';
import ParallaxFlatList from '@/components/ParallaxFlatList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigateToRadical } from '@/hooks/useNavigateToRadical';
import { groupCharactersByStrokes } from '@/scripts/groupCharactersByStrokes';
import { RadicalKeys } from '@/types/RadicalKeys';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Calculate the number of columns based on screen width
const isTablet = windowWidth >= 768;
const numColumns = isTablet ? (windowWidth > windowHeight ? 12 : 8) : (windowWidth > windowHeight ? 7 : 5);
const ITEM_WIDTH = isTablet ? 80 : 60;
const ITEM_MARGIN = isTablet ? windowWidth * 0.022 :  windowWidth * 0.025;

export default function KeysScreen() {
  const [radicalKeys, setRadicalKeys] = useState<Record<number, RadicalKeys[]>>({});
  const navigateToRadical = useNavigateToRadical();

  useEffect(() => {
    const groupedKeys = groupCharactersByStrokes(dataKeys.radicalKeys);
    setRadicalKeys(groupedKeys);
  }, []);

  const strokeCounts = Array.from({ length: 15 }, (_, index) => index + 1);
  const scheme = useColorScheme();
  const backgroundColor = scheme === 'dark' ? '#010606' : '#fff6e4';

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
        renderItem={({ item: keys }) => 
          keys.hanzi ? (
            <Pressable onPress={() => navigateToRadical(keys.number, 'keys')}>
              <ThemedView style={[styles.character, { backgroundColor }]}>
                <ThemedText type="default" style={styles.characterText}>{keys.hanzi}</ThemedText>
              </ThemedView>
            </Pressable>
          ) : null
      }
        numColumns={numColumns} // Number of columns for wrapping
        columnWrapperStyle={styles.rowWrapper} // Styling for rows
        showsHorizontalScrollIndicator={false}
      />
    </ThemedView>
  );

  return (
    <ParallaxFlatList
      headerBackgroundColor={{ light: '#fff6e4', dark: '#010606' }}
      title={'Иероглифические ключи'}
      data={strokeCounts}
      renderItem={renderStrokeSection}
    />
  );
}

const styles = StyleSheet.create({
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
    overflow: 'hidden',
    gap: ITEM_MARGIN,
    marginBottom: ITEM_MARGIN,
    justifyContent: "flex-start",
    padding: 2
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
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  characterText: {
    textAlign: 'center',
    fontSize: 32,
    paddingTop: 10,
  }
});
