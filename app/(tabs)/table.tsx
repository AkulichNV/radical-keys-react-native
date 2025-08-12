import { StyleSheet, Pressable, useColorScheme } from 'react-native';

import dataKeys from '@/assets/data/radicalKeys.json';
import { ThemedText } from '@/components/ThemedText';
import ParallaxFlatList from '@/components/ParallaxFlatList';
import { useNavigateToRadical } from '@/hooks/useNavigateToRadical';
import { RadicalKeys } from '@/types/RadicalKeys';
import React from 'react';


export default function TableKeysScreen() {
  const data = dataKeys.radicalKeys;
  const navigateToRadical = useNavigateToRadical();

  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const styles = getStyles(isDark);

  const backgroundColors = {
    row: isDark ? '#010606' : '#fff6e4',
    cell1: isDark ? '#272f3a' : '#fee8c5',
    cell4: isDark ? '#0e1211' : '#f2e7c5',
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const MemoizedRow = React.memo(({ item }: { item: RadicalKeys }) =>
  // const renderRow =({ item }: { item: RadicalKeys }) => 
    item.hanzi ? (
      <Pressable style={[styles.row, { backgroundColor: backgroundColors.row }]} onPress={() => navigateToRadical(item.number, 'table')}>
        <ThemedText style={[styles.cell, styles.cell1, { backgroundColor: backgroundColors.cell1 }]}>{item.number}</ThemedText>
        <ThemedText style={[styles.cell, styles.cell2, { backgroundColor: backgroundColors.cell1 }]}>{item.pinyin.split(',')[0]}</ThemedText>
        <ThemedText type="default" style={[styles.cell, styles.cell3]}>{item.hanzi}</ThemedText>
        <ThemedText style={[styles.cell, styles.cell4, { backgroundColor: backgroundColors.cell4 }]}>{truncateText(item.description?.short, 31)}</ThemedText>
      </Pressable>
    ) : null
  );
    const renderRow = ({ item }: { item: RadicalKeys }) => <MemoizedRow item={item} />;

  return (
    <ParallaxFlatList
    headerBackgroundColor={{ light: '#fff6e4', dark: '#010606' }}
    title={'Справочник иероглифических ключей'}
    data={data}
    renderItem={renderRow}
    />
  );

}

const getStyles = (isDark: boolean) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: isDark ? 1 : 2.5,
    borderColor: isDark ? '#272f3a' : '#cccc99',
    borderRadius: 40,
    flex: 1,
    overflow: 'hidden',
    shadowColor: isDark ? '#ffffff' : '#fce7c5',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 3,
    height: 100,
    alignItems: 'stretch',
  },
  cell1: {
    flex: 0.5,
    paddingLeft: 15,
    textAlign: 'center',
    paddingTop: '10%',
  },
  cell2: {
    flex: 1.2,
    borderBottomRightRadius: 40,
    paddingTop: '10%'
  },
  cell3: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 32,
  },
  cell4: {
    flex: 2.1,
    textAlign: 'right',
    paddingRight: 20,
    paddingLeft: 10,
    borderTopLeftRadius: 40,
    shadowColor: '#fffff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,  
    elevation: 5
  },
  cell: {
    textAlign: 'center',
    paddingVertical: 10,
  },
  listContainer: {
    padding: 20,
  },
  headerImage: {
    height: 250,
    width: '100%',
    resizeMode: "contain",
  },
});
