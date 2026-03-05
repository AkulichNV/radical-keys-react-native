import React from "react";
import renderer, { act } from "react-test-renderer";
import { TopBar } from "./../TopBar";

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

jest.mock("@expo/vector-icons/AntDesign", () => {
  const { Text } = require("react-native");
  return ({ name, size }: any) => (
    <Text testID={`antdesign-${name}`} data-size={size} />
  );
});

// --- Helpers ---

const defaultProps = {
  onPressBack: jest.fn(),
  title: "Test Title",
};

const renderComponent = (overrides = {}) =>
  renderer.create(<TopBar {...defaultProps} {...overrides} />);

const getPressable = (instance: renderer.ReactTestRenderer) =>
  instance.root.findByType(require("react-native").Pressable);

const flatStyle = (style: any): any =>
  Array.isArray(style) ? Object.assign({}, ...style.map(flatStyle)) : style ?? {};

// --- Tests ---

describe("TopBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly and matches snapshot", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the title as a string", () => {
    const instance = renderComponent({ title: "My Page" });
    const texts = instance.root.findAllByType(require("react-native").Text);
    const titleText = texts.find((t) => t.props.children === "My Page");
    expect(titleText).toBeTruthy();
  });

  it("renders the title as a number", () => {
    const instance = renderComponent({ title: 42 });
    const texts = instance.root.findAllByType(require("react-native").Text);
    const titleText = texts.find((t) => t.props.children === 42);
    expect(titleText).toBeTruthy();
  });

  it("renders the title as a string array", () => {
    const instance = renderComponent({ title: ["Part 1", "Part 2"] });
    const texts = instance.root.findAllByType(require("react-native").Text);
    const titleText = texts.find(
      (t) => Array.isArray(t.props.children) &&
        t.props.children.includes("Part 1") &&
        t.props.children.includes("Part 2")
    );
    expect(titleText).toBeTruthy();
  });

  it("calls onPressBack when pressable is pressed", () => {
    const onPressBack = jest.fn();
    const instance = renderComponent({ onPressBack });
    act(() => getPressable(instance).props.onPress());
    expect(onPressBack).toHaveBeenCalledTimes(1);
  });

  it("renders the back icon", () => {
    const instance = renderComponent();
    const backIcon = instance.root.findByProps({ testID: "antdesign-back" });
    expect(backIcon).toBeTruthy();
  });

  it("sets hitSlop to 8 on the Pressable", () => {
    const instance = renderComponent();
    expect(getPressable(instance).props.hitSlop).toBe(8);
  });

  it("applies custom style to the container", () => {
    const customStyle = { backgroundColor: "red" };
    const instance = renderComponent({ style: customStyle });
    const container = instance.root.findByType(require("react-native").View);
    const style = flatStyle(container.props.style);
    expect(style.backgroundColor).toBe("red");
  });

  it("applies base container styles", () => {
    const instance = renderComponent();
    const container = instance.root.findByType(require("react-native").View);
    const style = flatStyle(container.props.style);
    expect(style.flexDirection).toBe("row");
    expect(style.borderRadius).toBe(40);
    expect(style.paddingHorizontal).toBe(10);
  });

  it("merges custom style with base container styles", () => {
    const instance = renderComponent({ style: { margin: 20 } });
    const container = instance.root.findByType(require("react-native").View);
    const style = flatStyle(container.props.style);
    expect(style.flexDirection).toBe("row");
    expect(style.margin).toBe(20);
  });
});
