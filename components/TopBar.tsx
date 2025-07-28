import { Pressable, ViewStyle, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedText } from "./ThemedText";

interface ITopBar {
  onPressBack: () => void;
  title: string | string[] | number;
  style?: ViewStyle;
}

export const TopBar = ({
  onPressBack,
  title,
  style
}: ITopBar) => (
  <ThemedView style={[styles.container, style]}>
    <Pressable
      hitSlop={8}
      onPress={onPressBack}
      style={styles.rightButton}
    >
      <ThemedText type="title">
        <AntDesign name="caretleft" size={25}  />
      </ThemedText>
    </Pressable>
    <ThemedText type='title' style={styles.title}>{title}</ThemedText>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#272f3a',
    borderRadius: 40,
    marginVertical: 40
  },
  rightButton: {
    flex: 0.85
  },
  title: {
    flex: 1,
    textAlignVertical: 'center',
    paddingTop: 10
  }
});
