import { StyleSheet } from 'react-native';
import { Image, ImageBackground } from "expo-image";

import dataCalligraphyRules from '@/assets/data/calligraphyRules.json';
import { gifs } from '@/assets/images/gifs/gifs';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxFlatList from '@/components/ParallaxFlatList';
import { ICalligraphyRules } from '@/types/CalligraphyRules';

export default function CalligraphyRulesScreen() {
  const data = dataCalligraphyRules.calligraphyRules;

  function calligraphyRulesSection({ item }: { item: ICalligraphyRules }) {
    const gifSource1 = item.example.gif[0];
    const gifPath1 = gifSource1 ? gifs[gifSource1] : null;
    const gifSource2 = item.example.gif[1]; 
    const gifPath2 = gifSource2 ? gifs[gifSource2] : null;

    return (
      <ThemedView style={styles.container} >
        <ThemedText type="default" style={item.id % 2 === 0 ? styles.numberEven : styles.numberOdd}>{item.id}</ThemedText>
        {item.id % 2 !== 0 && <ThemedText type="default" style={styles.ruleContentEven}>{item.description}</ThemedText>}
        <ThemedView style={styles.gifContainer}>
          <ImageBackground 
            source={require('@/assets/images/z100.png')} 
            imageStyle={styles.background}
            contentFit="cover"
          >
            <Image
              source={gifPath1}
              style={styles.grid}
              contentFit="contain"
            />
          </ImageBackground>

          {gifPath2 && 
          <ImageBackground 
            source={require('@/assets/images/z100.png')} 
            imageStyle={styles.background}
            contentFit="cover"
          >
            <Image
              source={gifPath2}
              style={styles.grid}
              contentFit="contain"
            />
          </ImageBackground>
          }
        </ThemedView>
        {item.id % 2 === 0 && <ThemedText type="default" style={styles.ruleContentOdd}>{item.description}</ThemedText>}
      </ThemedView>
      )
    }

  return (
    <ParallaxFlatList
      headerBackgroundColor={{ light: '#fff6e4', dark: '#010606' }}
      title={'Основные правила каллиграфии'}
      data={data}
      renderItem={calligraphyRulesSection}
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 250,
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    paddingTop: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderColor: '#ffffff',
    position: 'relative',
    marginTop: 20
  },
  numberEven: {
    position: "absolute",
    top: -25,
    right: 0,
  },
  numberOdd: {
    position: "absolute",
    top: -25,
    left: 0,
  },
  ruleContentEven: {
    flex: 1,
    textAlign: 'left',
  },
  ruleContentOdd: {
    flex: 1,
    textAlign: 'right',
  },
  gifContainer: {
    flex: 0.5,
    flexDirection: 'column',
    gap: 10
  },
  background: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#272f3a',
    borderRadius: 20,
    
  },
  grid: {
    width: 100,
    height: 100,
    borderColor: '#d8caca',
    borderWidth: 1,
    borderRadius: 20,
  },
});
