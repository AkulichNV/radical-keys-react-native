import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from './ThemedText';
import { AntDesign } from '@expo/vector-icons';

const HEADER_HEIGHT = 250;

type Props<T> = PropsWithChildren<{
  headerBackgroundColor: { dark: string; light: string };
  data: T[];
  title: string;
  renderItem: ({ item }: { item: T }) => ReactElement;
  showBackButton?: boolean;
  topComponent?: ReactElement;
}>;

const ParallaxFlatList = <T,>({
  headerBackgroundColor,
  data,
  title,
  renderItem,
  showBackButton,
  topComponent
}: Props<T>): ReactElement => {
  const colorScheme = useColorScheme() ?? 'light';
  const flatListRef = useAnimatedRef<Animated.FlatList<T>>();
  const scrollOffset = useSharedValue(0);
  const navigation = useNavigation();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

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

  const listHeaderComponent = (
    <>
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
      {topComponent ? <ThemedView style={styles.topComponentWrap}>{topComponent}</ThemedView> : null}
    </>
  );

  return (
    <ThemedView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={styles.contentContainer}
      />
    </ThemedView>
  );
}

export default ParallaxFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    overflow: 'hidden',
    marginBottom: 0,
    height: HEADER_HEIGHT,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
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
    left: '27%',
    alignItems: 'center',
    fontSize: 15,
    textAlign: 'center',  
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 20,
  },
  contentContainer: {
    padding: 25,
    gap: 15,
    overflow: 'hidden',
    maxWidth: "100%",
  },
  backButton: {
    flex: 1,
    width: '45%',
    position: 'absolute',
    top: '53%',
    left: '25%',
  },
  topComponentWrap: {
    flex: 1,
    paddingTop: 10,
  },
});

