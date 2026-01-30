import { StyleSheet, Pressable, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxFlatList from '@/components/ParallaxFlatList';
import { ImageBackground } from 'expo-image';
import { useRouter } from 'expo-router';
import dataEtymologyRules from '@/assets/data/etymology.json';
import { Etymology } from '@/types/Etymology';
import { useState } from 'react';

export default function HomeScreen() {
  const [open, setOpen] = useState(false); //work incorrect
  const router = useRouter();
  const scheme = useColorScheme();

  function mainSection({ item }: { item: Etymology }) {

    return <ThemedView style={styles.container} >
      <Pressable style={styles.pressContainer} onPress={() => setOpen(!open)}>
        <ImageBackground 
          source={scheme === 'dark' ? 
            require('@/assets/images/darkGridBackground.png') 
            :
            require('@/assets/images/lightGridBackground.png')
          } 
          imageStyle={styles.background}
          contentFit="cover"
        >
          <ThemedText type='subtitle' style={styles.textContainer}>
            {item.translateRus}
          </ThemedText>
        </ImageBackground>
      </Pressable>
      <ThemedView style={{ display: open ? 'flex' : 'none' }}>
        <ThemedText type='subtitle' style={styles.textContainer}>
              {item.title} - {item.pinyin}
        </ThemedText>
        <ThemedText type='default' style={styles.textContainer}>
              {item.description}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  }

  return (
    <ParallaxFlatList
      headerBackgroundColor={{ light: '#fff6e4', dark: '#010606' }}
      title={'Основы китайской каллиграфии'}
      data={dataEtymologyRules.etymology}
      renderItem={mainSection}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    marginTop: 10
  },
  pressContainer: {
    flex: 1,
  },
  background: {
    borderWidth: 1,
    borderColor: '#272f3a',
    borderRadius: 40,
  },
  textContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    textAlign: 'center'
  }
});
