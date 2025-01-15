import { StyleSheet, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDataContext } from '@/context/KeyContext';
import { findCharacterById } from '@/scripts/findCharacterById';
import { RadicalKeys } from '@/types/RadicalKeys';
import dataKeys from '../../assets/data/radicalKeys.json';

export default function TabTwoScreen() {

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

  const renderHeader = () => (
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Таблица иероглифических ключей</ThemedText>
      </ThemedView>
  );

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
    <FlatList
      data={data}
      keyExtractor={(item) => item.number.toString()}
      renderItem={renderRow}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.listContainer}
    />
  );

}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
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
});
