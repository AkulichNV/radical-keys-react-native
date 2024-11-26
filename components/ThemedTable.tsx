import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { RadicalKeys } from '@/types/RadicalKeys';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

interface TableProps {
  data: RadicalKeys[];
}

const ThemedTable: React.FC<TableProps> = ({ data }) => {
  function onRowPress(id: number) {
    console.log(id);
  }
  return (
    <ThemedView style={styles.container}>
      {/* Table Header */}
      <View style={styles.row}>
        <ThemedText type="subtitle" style={styles.header}>№</ThemedText>
        <ThemedText type="subtitle" style={styles.header}>Иероглиф</ThemedText>
        <ThemedText type="subtitle" style={styles.header}>Значение</ThemedText>
        <ThemedText type="subtitle" style={styles.header}>Название</ThemedText>
        <ThemedText type="subtitle" style={styles.header}>Кол-во черт</ThemedText>
      </View>

      {/* Table Rows */}
      {data.map((row, index) => (
        <Pressable style={styles.row} key={index} onPress={()=>{onRowPress(row.number)}}>
          <ThemedText style={styles.cell}>{row.number}</ThemedText>
          <ThemedText style={styles.cell}>{row.hanzi}</ThemedText>
          <ThemedText style={styles.cell}>{row.description.short}</ThemedText>
          <ThemedText style={styles.cell}>{row.pinyin}</ThemedText>
          <ThemedText style={styles.cell}>{row.strokeNumber}</ThemedText>
        </Pressable>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  cell: {
    fontSize: 14,
    flex: 1,
  },
});

export default ThemedTable;