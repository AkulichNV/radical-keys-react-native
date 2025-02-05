import { ImageBackground, StyleSheet } from 'react-native';
import { Image } from "expo-image";

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxFlatList from '@/components/ParallaxFlatList';
import dataStrokeOrdersRules from '@/assets/data/strokeOrderRules.json';
import { StrokeOrderRules } from '@/types/StrokeOrderRules';
import { gifs } from '@/assets/images/gifs/gifs';

export default function StrokesScreen() {
  const data = dataStrokeOrdersRules.strokeOrderRules;

   function strokeOrderRulesSection({ item }: { item: StrokeOrderRules }) {
    const giSource1 = item.example.unicode[0]; 
    const gifPath1 = giSource1 ? gifs[giSource1] : null;
    const giSource2 = item.example.unicode[1]; 
    const gifPath2 = giSource2 ? gifs[giSource2] : null;
      return (
      <ThemedView style={styles.container} >
        <ThemedText type="title" style={styles.titleContainer}>{item.numberRule}</ThemedText>
        <ThemedText type="default" style={styles.ruleContent}>{item.ruleContent}</ThemedText>
        <ImageBackground 
          source={require('@/assets/images/z100.png')} 
          imageStyle={styles.background}
          resizeMode="cover"
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
        resizeMode="cover"
      >
        <Image
          source={gifPath2}
          style={styles.grid}
          contentFit="contain"
        />
      </ImageBackground>
        }
      </ThemedView>
      )
    }

  return (
    <ParallaxFlatList
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#010606' }}
      headerImage={
          <Image
            source={require('@/assets/images/background1.jpg')}
            style={styles.headerImage}
          />
      }
      title={'Основные правила порядка черт'}
      data={data}
      renderItem={strokeOrderRulesSection}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 0.2
  },
  ruleContent: {
    flex: 0.8
  },
  headerImage: {
    height: 250,
    width: '100%',
    resizeMode: "contain",
  },

  background: {
    borderWidth: 1,
    borderColor: '#272f3a',
    borderRadius: 40,
  },
  grid: {
    width: 100,
    height: 100,
    borderColor: '#d8caca',
    borderWidth: 1,
    borderRadius: 40,
  },
});
