import { StyleSheet, Pressable, Image } from 'react-native';

import dataKeys from '@/assets/data/radicalKeys.json';
import { ThemedText } from '@/components/ThemedText';
import ParallaxFlatList from '@/components/ParallaxFlatList';
import { useNavigateToRadical } from '@/hooks/useNavigateToRadical';
import { RadicalKeys } from '@/types/RadicalKeys';
import React from 'react';

export default function TableKeysScreen() {
  const data = dataKeys.radicalKeys;
  const navigateToRadical = useNavigateToRadical();

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const MemoizedRow = React.memo(({ item }: { item: RadicalKeys }) =>
  // const renderRow =({ item }: { item: RadicalKeys }) => 
    item.hanzi ? (
      <Pressable style={styles.row} onPress={() => navigateToRadical(item.number, 'table')}>
        <ThemedText style={[styles.cell, styles.cell1]}>{item.number}</ThemedText>
        <ThemedText style={[styles.cell, styles.cell2]}>{item.pinyin.split(',')[0]}</ThemedText>
        <ThemedText type="default" style={[styles.cell, styles.cell3]}>{item.hanzi}</ThemedText>
        <ThemedText style={[styles.cell, styles.cell4]}>{truncateText(item.description?.short, 31)}</ThemedText>
      </Pressable>
    ) : null
  );
    const renderRow = ({ item }: { item: RadicalKeys }) => <MemoizedRow item={item} />;

  return (
    <ParallaxFlatList
    headerBackgroundColor={{ light: '#A1CEDC', dark: '#010606' }}
    headerImage={
      <Image
        source={require('@/assets/images/background1.jpg')}
        style={styles.headerImage}
      />
    }
    title={'Таблица иероглифических ключей'}
    data={data}
    renderItem={renderRow}
    />
  );

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#272f3a',
    borderRadius: 40,
    backgroundColor: '#010606',
    flex: 1,
    overflow: 'hidden',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 3,
    height: 100,
    alignItems: 'stretch',
  },
  cell1: {
    flex: 0.5,
    backgroundColor: '#272f3a',
    paddingLeft: 15,
    textAlign: 'center',
    paddingTop: '10%',
  },
  cell2: {
    flex: 1.2,
    borderWidth: 1,
    borderColor: '#272f3a',
    borderBottomRightRadius: 40,
    backgroundColor: '#272f3a',
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
    backgroundColor: '#0e1211',
    borderWidth: 1,
    borderColor: '#0e1211',
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
