import { StyleSheet, Pressable, Image } from 'react-native';

import dataKeys from '@/assets/data/radicalKeys.json';
import { ThemedText } from '@/components/ThemedText';
import ParallaxFlatList from '@/components/ParallaxFlatList';
import { useNavigateToRadical } from '@/hooks/useNavigateToRadical';
import { RadicalKeys } from '@/types/RadicalKeys';

export default function TableKeysScreen() {
  const data = dataKeys.radicalKeys;
  const navigateToRadical = useNavigateToRadical();

  const renderRow =({ item }: { item: RadicalKeys }) => (
    <Pressable style={styles.row} onPress={() => navigateToRadical(item.number, 'table')}>
      <ThemedText style={[styles.cell, styles.cell1]}>{item.number}</ThemedText>
      <ThemedText style={[styles.cell, styles.cell2]}>{item.pinyin}</ThemedText>
      <ThemedText type="title" style={[styles.cell, styles.cell3]}>{item.hanzi}</ThemedText>
      <ThemedText style={[styles.cell, styles.cell4]}>{item.description.short}</ThemedText>
    </Pressable>
  )

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
    elevation: 3
  },
  cell1: {
    flex: 0.4,
    backgroundColor: '#272f3a',
    paddingLeft: 15,
    alignContent: 'center',
    
  },
  cell2: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#272f3a',
    borderBottomRightRadius: 40,
    backgroundColor: '#272f3a',
    
  },
  cell3: {
    flex: 1.2,
    alignSelf: 'center',
  },
  cell4: {
    flex: 2,
    textAlign: 'right',
    paddingRight: 15,
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
