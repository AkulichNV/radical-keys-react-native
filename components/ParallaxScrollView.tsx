import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme, Image } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from './ThemedText';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  title: string;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  title,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}>
          {colorScheme === 'dark' ? 
            <Image
              source={require('@/assets/images/background1.jpg')}
              style={styles.headerImage}
            /> : <Image
              source={require('@/assets/images/background21.png')}
              style={styles.headerImage}
            />}
            <ThemedText type="subtitle" style={styles.headerText}>{title}</ThemedText>
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    overflow: 'hidden',
  },
  headerImage: {
    height: 250,
    width: "100%",
    resizeMode: "contain",
  },
  headerText: {
    width: '45%',
    position: 'absolute',
    top: '65%',
    left: '25%',
    alignItems: 'center',
    fontSize: 15,
    textAlign: 'center',  
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
