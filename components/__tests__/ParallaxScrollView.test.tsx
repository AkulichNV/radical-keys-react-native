import React from "react";
import renderer, { act } from "react-test-renderer";
import { Text } from "react-native";
import ParallaxScrollView from "./../ParallaxScrollView";

// --- Mocks ---

jest.mock("@/components/ThemedView", () => {
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
  const useAnimatedStyle = (fn: any) => { try { return fn(); } catch { return {}; } };
  const useScrollViewOffset = () => ({ value: 0 });
  const useAnimatedRef = () => ({ current: null });
  const interpolate = (_val: any, _in: any, out: any) => out[0];

  const Animated = {
    View: ({ children, style }: any) => <View style={style}>{children}</View>,
    ScrollView: (() => {
      const mockForwardRef = require("react").forwardRef;
      return mockForwardRef(({ children, style }: any, _ref: any) => (
        <ScrollView style={style}>{children}</ScrollView>
      ));
    })(),
  };

  return {
    __esModule: true,
    default: Animated,
    useSharedValue,
    useAnimatedStyle,
    useScrollViewOffset,
    useAnimatedRef,
    interpolate,
  };
});

jest.mock("@/assets/images/background1.jpg", () => "background1.jpg");
jest.mock("@/assets/images/background21.png", () => "background21.png");

// --- Helpers ---

const defaultProps = {
  title: "Test Title",
  headerBackgroundColor: { dark: "#000", light: "#fff" },
};

const renderComponent = (overrides = {}, children?: React.ReactNode) =>
  renderer.create(
    <ParallaxScrollView {...defaultProps} {...overrides}>
      {children}
    </ParallaxScrollView>
  );

// --- Tests ---

describe("ParallaxScrollView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly and matches snapshot", () => {
    const tree = renderComponent({}, <Text>Content</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the title text", () => {
    const instance = renderComponent({ title: "My Title" });
    const texts = instance.root.findAllByType(require("react-native").Text);
    const titleText = texts.find((t) => t.props.children === "My Title");
    expect(titleText).toBeTruthy();
  });

  it("renders children inside content view", () => {
    const instance = renderComponent({}, <Text testID="child-node">Hello</Text>);
    const child = instance.root.findByProps({ testID: "child-node" });
    expect(child.props.children).toBe("Hello");
  });

  it("does not render back button when showBackButton is undefined", () => {
    const instance = renderComponent();
    const backIcons = instance.root.findAllByProps({ testID: "antdesign-back" });
    expect(backIcons).toHaveLength(0);
  });

  it("does not render back button when showBackButton is false", () => {
    const instance = renderComponent({ showBackButton: false });
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
    const topComponent = <Text testID="top-component">Top</Text>;
    const instance = renderComponent({ topComponent });
    const top = instance.root.findByProps({ testID: "top-component" });
    expect(top).toBeTruthy();
  });

  it("does not render topComponent when not provided", () => {
    const instance = renderComponent({ topComponent: undefined });
    const tops = instance.root.findAllByProps({ testID: "top-component" });
    expect(tops).toHaveLength(0);
  });

  it("renders light theme background image when color scheme is light", () => {
    const instance = renderComponent();
    const images = instance.root.findAllByType(require("react-native").Image);
    const lightImage = images.find((img) => img.props.source === "background21.png");
    expect(lightImage).toBeTruthy();
  });

  it("renders without crashing when no children provided", () => {
    expect(() => renderComponent()).not.toThrow();
  });
});
