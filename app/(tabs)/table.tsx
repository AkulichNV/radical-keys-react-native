import { StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { useDataContext } from '@/context/KeyContext';
import { findCharacterById } from '@/scripts/findCharacterById';
import { RadicalKeys } from '@/types/RadicalKeys';
import dataKeys from '../../assets/data/radicalKeys.json';
import ParallaxFlatList from '@/components/ParallaxFlatList';

export default function TableKeysScreen() {

  const data = dataKeys.radicalKeys;
  const router = useRouter();
  const { setData } = useDataContext();

  function onRowPress(id: number) {
    const radicalKey = findCharacterById(dataKeys.radicalKeys, id);
    setData(radicalKey);
    router.push({
      pathname: '/keys/[key]',
      params: { key: id, from: 'table' },
    });
  }

  function renderRow({ item }: { item: RadicalKeys }) {
    
    return (
    <Pressable style={styles.row} onPress={() => onRowPress(item.number)}>
      <ThemedText style={[styles.cell, styles.cell1]}>{item.number}</ThemedText>
      <ThemedText type="title" style={[styles.cell, styles.cell2]}>{item.hanzi}</ThemedText>
      <ThemedText style={[styles.cell, styles.cell3]}>{item.pinyin}</ThemedText>
      <ThemedText style={[styles.cell, styles.cell4]}>{item.description.short}</ThemedText>
    </Pressable>
    )
  }

  return (
    <ParallaxFlatList
    headerBackgroundColor={{ light: '#A1CEDC', dark: '#010606' }}
    headerImage={
      <Image
        source={require('@/assets/images/background1.jpg')}
        style={styles.knotSymbol}
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    flex: 1,
    overflow: 'hidden',
  },
  cell1: {
    flex: 0.4,
  },
  cell2: {
    flex: 1,
  },
  cell3: {
    flex: 1.2,
  },
  cell4: {
    flex: 2,
    textAlign: 'right'
  },
  cell: {
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
  },
  knotSymbol: {
    height: 250,
    width: '100%',
    resizeMode: "contain",
  },
});
