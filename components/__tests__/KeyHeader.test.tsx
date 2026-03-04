import React from "react";
import renderer, { act } from "react-test-renderer";
import { KeyHeader } from "./../KeyHeader";

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
    ThemedText: ({ children, style }: any) => <Text style={style}>{children}</Text>,
  };
});

jest.mock("./../SvgRenderer", () => ({
  SvgRenderer: ({ svgName, width, height, color }: any) => {
    const { View } = require("react-native");
    return <View testID="svg-renderer" data-svgname={svgName} data-width={width} data-height={height} data-color={color} />;
  },
}));

jest.mock("@expo/vector-icons/AntDesign", () => {
  const { Text } = require("react-native");
  return ({ name, size, color }: any) => (
    <Text testID={`antdesign-${name}`} data-size={size} data-color={color} />
  );
});

jest.mock("@expo/vector-icons/FontAwesome5", () => {
  const { Text } = require("react-native");
  return ({ name, size, color }: any) => (
    <Text testID={`fontawesome5-${name}`} data-size={size} data-color={color} />
  );
});

jest.mock("@/assets/images/svgs/svgs", () => ({}));

// --- Helpers ---

const mockProps = {
  svgName: "testSvg",
  gridBackgroundImage: { uri: "https://example.com/bg.png" },
  svgColorKey: "#ff0000",
  svgColorIcon: "#00ff00",
  backgroundColorPress: "#0000ff",
  playSound: jest.fn(),
  descriptionOpenModal: jest.fn(),
  onPressRight: jest.fn(),
  onPressLeft: jest.fn(),
  pinyin: "nǐ hǎo",
  description: "Hello",
  number: 42,
};

const renderComponent = (overrides = {}) =>
  renderer.create(<KeyHeader {...mockProps} {...overrides} />);

// --- Tests ---

describe("KeyHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly and matches snapshot", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("displays the correct number", () => {
    const instance = renderComponent();
    const texts = instance.root.findAllByType(require("react-native").Text);
    const numberText = texts.find((t) => t.props.children?.toString().includes("42"));
    expect(numberText).toBeTruthy();
  });

  it("displays the pinyin text", () => {
    const instance = renderComponent();
    const texts = instance.root.findAllByType(require("react-native").Text);
    const pinyinText = texts.find((t) => t.props.children === "nǐ hǎo");
    expect(pinyinText).toBeTruthy();
  });

  it("displays the description text", () => {
    const instance = renderComponent();
    const texts = instance.root.findAllByType(require("react-native").Text);
    const descText = texts.find((t) => t.props.children === "Hello");
    expect(descText).toBeTruthy();
  });

  it("calls playSound when sound pressable is pressed", () => {
    const instance = renderComponent();
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    const soundPress = pressables.find((p) =>
      p.props.onPress === mockProps.playSound
    );
    act(() => soundPress?.props.onPress());
    expect(mockProps.playSound).toHaveBeenCalledTimes(1);
  });

  it("calls descriptionOpenModal when description pressable is pressed", () => {
    const instance = renderComponent();
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    const descPress = pressables.find((p) =>
      p.props.onPress === mockProps.descriptionOpenModal
    );
    act(() => descPress?.props.onPress());
    expect(mockProps.descriptionOpenModal).toHaveBeenCalledTimes(1);
  });

  it("calls onPressLeft when left caret is pressed", () => {
    const instance = renderComponent();
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    const leftPress = pressables.find((p) =>
      p.props.onPress === mockProps.onPressLeft
    );
    act(() => leftPress?.props.onPress());
    expect(mockProps.onPressLeft).toHaveBeenCalledTimes(1);
  });

  it("calls onPressRight when right caret is pressed", () => {
    const instance = renderComponent();
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    const rightPress = pressables.find((p) =>
      p.props.onPress === mockProps.onPressRight
    );
    act(() => rightPress?.props.onPress());
    expect(mockProps.onPressRight).toHaveBeenCalledTimes(1);
  });

  it("renders SvgRenderer with correct props", () => {
    const instance = renderComponent();
    const svg = instance.root.findByProps({ testID: "svg-renderer" });
    expect(svg.props["data-svgname"]).toBe("testSvg");
    expect(svg.props["data-width"]).toBe(250);
    expect(svg.props["data-height"]).toBe(250);
    expect(svg.props["data-color"]).toBe("#ff0000");
  });

  it("applies backgroundColorPress to both pressable buttons", () => {
    const instance = renderComponent();
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    const coloredPressables = pressables.filter((p) => {
      const style = [p.props.style].flat();
      return style.some((s: any) => s?.backgroundColor === "#0000ff");
    });
    expect(coloredPressables.length).toBe(2);
  });

  it("renders all four Pressable elements", () => {
    const instance = renderComponent();
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    expect(pressables).toHaveLength(4);
  });
});
