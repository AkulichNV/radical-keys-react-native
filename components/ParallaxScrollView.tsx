import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from './ThemedText';
import { AntDesign } from '@expo/vector-icons';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  title: string;
  headerBackgroundColor: { dark: string; light: string };
  showBackButton?: boolean;
}>;

export default function ParallaxScrollView({
  children,
  title,
  headerBackgroundColor,
  showBackButton
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const navigation = useNavigation();

  const headerAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(
              scrollOffset.value,
              [ 0, HEADER_HEIGHT],  // Allow the content to overlap header
              [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]   // Move header up as content scrolls
            ),
          },
          {
            scale: interpolate(scrollOffset.value, [ 0, HEADER_HEIGHT], [2, 1, 1]), // Reduce the size of the header
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
            {showBackButton && (
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
              <ThemedText type="title">
                <AntDesign name="back" size={15}  />
            </ThemedText>
            </Pressable>
          )}
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
    // paddingTop: 25
  },
  header: {
    overflow: 'hidden',
    marginBottom: 0,
    height: HEADER_HEIGHT,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    // paddingTop: 25
  },
  headerImage: {
    height: HEADER_HEIGHT,
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
    // flex: 1,
    padding: 25,
    gap: 15,
    overflow: 'hidden',
    maxWidth: '100%'
  },
  backButton: {
    flex: 1,
    width: '45%',
    position: 'absolute',
    top: '55%',
    left: '27%',
  }
});
