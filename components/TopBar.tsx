import { Pressable, ViewStyle, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedText } from "./ThemedText";

interface ITopBar {
  onPress: () => void;
  title: string | number;
  style?: ViewStyle;
}

export const TopBar = ({
  onPress,
  title,
  style
}: ITopBar) => (
  <ThemedView style={[styles.container, style]}>
    <Pressable
      hitSlop={8}
      onPress={onPress}
      style={styles.rightButton}
    >
      <ThemedText type="title">
        <AntDesign name="left" size={25} />
      </ThemedText>
    </Pressable>
    <ThemedText type='title' style={styles.title}>№{title}</ThemedText>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0a7ea4',
    marginBottom: 20
  },
  rightButton: {
    flex: 0.75
  },
  title: {
    flex: 1
  }
});
