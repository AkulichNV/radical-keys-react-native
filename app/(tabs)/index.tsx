import { StyleSheet, Pressable, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxFlatList from '@/components/ParallaxFlatList';
import { ImageBackground } from 'expo-image';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const data: any = [
    {
      "title": "Правила порядка черт",
      "route": "/rules/strokes_rules"
    },
    {
      "title": "Правила каллиграфии",
      "route": "/rules/calligraphy_rules"
    },
    {
      "title": "Восемь принципов Юн",
      "route": "/rules/yong_rules"
    },
    {
      "title": "Стили китайской каллиграфии",
      "route": "/rules/styles_rules"
    },
    {
      "title": "Калиграффические элементы",
      "route": "/rules/elements_rules"
    }
  ]
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  function mainSection({ item }: { item: any }) {
    return <ThemedView style={styles.container} >
      <Pressable style={styles.pressContainer} onPress={() => router.push(item.route as any)}>
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
            {item.title}
          </ThemedText>
        </ImageBackground>
      </Pressable>
    </ThemedView>
  }

  return (
    <ParallaxFlatList
      headerBackgroundColor={{ light: '#fff6e4', dark: '#010606' }}
      title={'Основы китайской каллиграфии'}
      data={data}
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
