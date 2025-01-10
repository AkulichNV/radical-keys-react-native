import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useDataContext } from '@/context/KeyContext';

import { RadicalKeys } from '@/types/RadicalKeys';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { findCharacterById } from '@/scripts/findCharacterById';
import dataKeys from '@/assets/data/radicalKeys.json';

interface TableProps {
  data: RadicalKeys[];
}

const ThemedTable: React.FC<TableProps> = ({ data }) => {
  const router = useRouter();
  const { setData } = useDataContext();
  function onRowPress(id: number) {
    const radicalKey = findCharacterById(dataKeys.radicalKeys, id)
    setData(radicalKey);
    router.push({
          pathname: '/keys/[key]',
          params: { key: id, from: 'table' },
        });
  }
  return (
    <ThemedView>
      {/* Table Header */}
      <View style={styles.row}>
        <ThemedText type="subtitle" style={[styles.header, styles.cell1]}>№</ThemedText>
        <ThemedText type="subtitle" style={[styles.header, styles.cell2]}>汉字</ThemedText>
        <ThemedText type="subtitle" style={[styles.header, styles.cell3]}>拼音</ThemedText>
        <ThemedText type="subtitle" style={[styles.header, styles.cell4]}>Значение</ThemedText>
      </View>

      {/* Table Rows */}
      {data.map((item, index) => (
        <Pressable style={styles.row} key={index} onPress={()=>{onRowPress(item.number)}}>
          <ThemedText style={[styles.cell, styles.cell1]}>{item.number}</ThemedText>
          <ThemedText type="title" style={[styles.cell, styles.cell2]}>{item.hanzi}</ThemedText>
          <ThemedText style={[styles.cell, styles.cell3]}>{item.pinyin}</ThemedText>
          <ThemedText style={[styles.cell, styles.cell4]}>{item.description.short}</ThemedText>
        </Pressable>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  header: {
    textAlign: 'center',
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
    // fontSize: 14,
    textAlign: 'center',
  },
});

export default ThemedTable;