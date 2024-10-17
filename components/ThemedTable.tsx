import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { RadicalKeys } from '@/types/RadicalKeys';

interface TableProps {
  data: RadicalKeys[];
}

const ThemedTable: React.FC<TableProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.row}>
        <Text style={styles.header}>№</Text>
        <Text style={styles.header}>Иероглиф</Text>
        <Text style={styles.header}>Значение</Text>
        <Text style={styles.header}>Название</Text>
        <Text style={styles.header}>Кол-во черт</Text>
      </View>

      {/* Table Rows */}
      {data.map((row, index) => (
        <View style={styles.row} key={index}>
          <Text style={styles.cell}>{row.number}</Text>
          <Text style={styles.cell}>{row.hanzi}</Text>
          <Text style={styles.cell}>{row.description.short}</Text>
          <Text style={styles.cell}>{row.pinyin}</Text>
          <Text style={styles.cell}>{row.strokeNumber}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
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