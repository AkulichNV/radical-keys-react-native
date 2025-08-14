import { StyleSheet } from 'react-native';
import { Image, ImageBackground } from "expo-image";

import dataStrokeOrdersRules from '@/assets/data/strokeOrderRules.json';
import { gifs } from '@/assets/images/gifs/gifs';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxFlatList from '@/components/ParallaxFlatList';
import { StrokeOrderRules } from '@/types/StrokeOrderRules';

export default function StrokesScreen() {
  const data: StrokeOrderRules[] = dataStrokeOrdersRules.strokeOrderRules;

  function strokeOrderRulesSection({ item }: { item: StrokeOrderRules }) {
    const giSource1 = item.example.unicode[0]; 
    const gifPath1 = giSource1 ? gifs[giSource1] : null;
    const giSource2 = item.example.unicode[1]; 
    const gifPath2 = giSource2 ? gifs[giSource2] : null;

    return (
      <ThemedView style={styles.container} >
        <ThemedText type="default" style={item.numberRule % 2 === 0 ? styles.numberEven : styles.numberOdd}>{item.numberRule}</ThemedText>
        {item.numberRule % 2 !== 0 && <ThemedText type="default" style={styles.ruleContentEven}>{item.ruleContent}</ThemedText>}
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
        {item.numberRule % 2 === 0 && <ThemedText type="default" style={styles.ruleContentOdd}>{item.ruleContent}</ThemedText>}
      </ThemedView>
      )
    }

  return (
    <ParallaxFlatList
      headerBackgroundColor={{ light: '#fff6e4', dark: '#010606' }}
      title={'Основные правила порядка черт иероглифов'}
      data={data}
      renderItem={strokeOrderRulesSection}
      showBackButton
    />
  );
}

const styles = StyleSheet.create({
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
