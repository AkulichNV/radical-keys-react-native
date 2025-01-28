import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from './ThemedText';


const HEADER_HEIGHT = 250;

type Props<T> = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  data: T[];
  title: string;
  renderItem: ({ item }: { item: T }) => ReactElement;
}>;

const ParallaxFlatList = <T,>({
  headerImage,
  headerBackgroundColor,
  data,
  title,
  renderItem,
}: Props<T>): ReactElement => {
  const colorScheme = useColorScheme() ?? 'light';
  const flatListRef = useAnimatedRef<Animated.FlatList<T>>();
  const scrollOffset = useSharedValue(0);

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
    <Animated.View
      style={[
        styles.header,
        { backgroundColor: headerBackgroundColor[colorScheme] },
        headerAnimatedStyle,
      ]}>
      {headerImage}
      <ThemedText type="subtitle" style={styles.headerText}>{title}</ThemedText>
    </Animated.View>
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
    flex: 1,
  },
  header: {
    overflow: 'hidden',
    margin: -32,
    marginBottom: 0,
    height: HEADER_HEIGHT,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
  },
  headerText: {
    width: '45%',
    position: 'absolute',
    top: '75%',
    left: '50%',
    transform: [ { translateX: '-50%' }, { translateY: '-50%' } ],
    fontSize: 15,
    textAlign: 'center',  
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 20,
  },
  contentContainer: {
    padding: 32,
    gap: 15,
    overflow: 'hidden',
  },
});

