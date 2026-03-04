import React from "react";
import renderer, { act } from "react-test-renderer";
import { Text } from "react-native";
import ParallaxFlatList from "./../ParallaxFlatList";

// --- Mocks ---

jest.mock("./../ThemedView", () => {
  const { View } = require("react-native");
  return {
    ThemedView: ({ children, style }: any) => <View style={style}>{children}</View>,
  };
});

jest.mock("./../ThemedText", () => {
  const { Text } = require("react-native");
  return {
    ThemedText: ({ children, style, type }: any) => (
      <Text style={style} data-type={type}>{children}</Text>
    ),
  };
});

jest.mock("@expo/vector-icons", () => ({
  AntDesign: ({ name, size }: any) => {
    const { Text } = require("react-native");
    return <Text testID={`antdesign-${name}`} data-size={size} />;
  },
}));

const mockGoBack = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
}));

jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
  default: jest.fn(() => "light"),
}));

jest.mock("react-native-reanimated", () => {
  const { View, ScrollView } = require("react-native");
  const useSharedValue = (init: any) => ({ value: init });
  const useAnimatedStyle = (fn: any) => fn();
  const useAnimatedScrollHandler = (handlers: any) => handlers;
  const useAnimatedRef = () => ({ current: null });
  const interpolate = (_val: any, _in: any, out: any) => out[0];
  const Animated = {
    View: ({ children, style }: any) => <View style={style}>{children}</View>,
    ScrollView: ({ children, style }: any) => <ScrollView style={style}>{children}</ScrollView>,
    FlatList: (() => {
      const mockForwardRef = require("react").forwardRef;
      return mockForwardRef(({ data, renderItem, ListHeaderComponent, keyExtractor, style }: any, _ref: any) => {
        const { View } = require("react-native");
        return (
          <View style={style}>
            {typeof ListHeaderComponent === "function" ? <ListHeaderComponent /> : ListHeaderComponent}
            {data?.map((item: any, index: number) => (
              <View key={keyExtractor ? keyExtractor(item, index) : index}>
                {renderItem({ item })}
              </View>
            ))}
          </View>
        );
      });
    })(),
  };
  return {
    __esModule: true,
    default: Animated,
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    useAnimatedRef,
    interpolate,
  };
});

jest.mock("@/assets/images/background1.jpg", () => "background1.jpg");
jest.mock("@/assets/images/background21.png", () => "background21.png");

// --- Helpers ---

type TestItem = { id: number; label: string };

const defaultProps = {
  headerBackgroundColor: { dark: "#000", light: "#fff" },
  data: [
    { id: 1, label: "Item 1" },
    { id: 2, label: "Item 2" },
  ] as TestItem[],
  title: "Test Title",
  renderItem: ({ item }: { item: TestItem }) => (
    <Text testID={`item-${item.id}`}>{item.label}</Text>
  ),
};

const renderComponent = (overrides = {}) =>
  renderer.create(<ParallaxFlatList {...defaultProps} {...overrides} />);

// --- Tests ---

describe("ParallaxFlatList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly and matches snapshot", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders all data items", () => {
    const instance = renderComponent();
    const item1 = instance.root.findByProps({ testID: "item-1" });
    const item2 = instance.root.findByProps({ testID: "item-2" });
    expect(item1.props.children).toBe("Item 1");
    expect(item2.props.children).toBe("Item 2");
  });

  it("renders the title text", () => {
    const instance = renderComponent({ title: "My Header" });
    const texts = instance.root.findAllByType(require("react-native").Text);
    const titleText = texts.find((t) => t.props.children === "My Header");
    expect(titleText).toBeTruthy();
  });

  it("does not render back button when showBackButton is false", () => {
    const instance = renderComponent({ showBackButton: false });
    const backIcons = instance.root.findAllByProps({ testID: "antdesign-back" });
    expect(backIcons).toHaveLength(0);
  });

  it("does not render back button when showBackButton is undefined", () => {
    const instance = renderComponent();
    const backIcons = instance.root.findAllByProps({ testID: "antdesign-back" });
    expect(backIcons).toHaveLength(0);
  });

  it("renders back button when showBackButton is true", () => {
    const instance = renderComponent({ showBackButton: true });
    const backIcon = instance.root.findByProps({ testID: "antdesign-back" });
    expect(backIcon).toBeTruthy();
  });

  it("calls navigation.goBack when back button is pressed", () => {
    const instance = renderComponent({ showBackButton: true });
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    const backButton = pressables.find((p) => p.props.style);
    act(() => backButton?.props.onPress());
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it("renders topComponent when provided", () => {
    const topComponent = <Text testID="top-component">Top Content</Text>;
    const instance = renderComponent({ topComponent });
    const top = instance.root.findByProps({ testID: "top-component" });
    expect(top).toBeTruthy();
  });

  it("does not render topComponent when not provided", () => {
    const instance = renderComponent({ topComponent: undefined });
    const tops = instance.root.findAllByProps({ testID: "top-component" });
    expect(tops).toHaveLength(0);
  });

  it("renders with an empty data array without crashing", () => {
    expect(() => renderComponent({ data: [] })).not.toThrow();
  });

  it("renders header image for light color scheme", () => {
    const instance = renderComponent();
    const images = instance.root.findAllByType(require("react-native").Image);
    const lightImage = images.find((img) => img.props.source === "background21.png");
    expect(lightImage).toBeTruthy();
  });
});
