import React from "react";
import renderer, { act } from "react-test-renderer";
import { SvgGif } from "./../SvgGif";

// --- Mocks ---

jest.mock("./../SvgRenderer", () => ({
  SvgRenderer: ({ svgName, width, height }: any) => {
    const { View } = require("react-native");
    return <View testID="svg-renderer" data-svgname={svgName} data-width={width} data-height={height} />;
  },
}));

jest.mock("expo-image", () => ({
  Image: ({ source, style, contentFit }: any) => {
    const { View } = require("react-native");
    return <View testID="expo-image" data-source={source} style={style} data-contentfit={contentFit} />;
  },
}));

jest.mock("@expo/vector-icons/AntDesign", () => {
  const { Text } = require("react-native");
  return ({ name, style }: any) => <Text testID={`antdesign-${name}`} style={style} />;
});

jest.mock("@/assets/images/gifs/gifs", () => ({
  gifs: {
    testGif: "path/to/test.gif",
  },
}));

jest.mock("@/assets/images/svgs/svgs", () => ({}));
jest.mock("@/assets/images/z200.png", () => "z200.png");

// --- Helpers ---

const defaultProps = {
  gifSource: "testGif",
  svgSource: "testSvg",
};

const renderComponent = (overrides = {}) =>
  renderer.create(<SvgGif {...defaultProps} {...overrides} />);

const getPressable = (instance: renderer.ReactTestRenderer) =>
  instance.root.findByType(require("react-native").Pressable);

// --- Tests ---

describe("SvgGif", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly in default state and matches snapshot", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders SvgRenderer initially when gif is not visible", () => {
    const instance = renderComponent();
    const svg = instance.root.findByProps({ testID: "svg-renderer" });
    expect(svg).toBeTruthy();
    expect(svg.props["data-svgname"]).toBe("testSvg");
  });

  it("renders play icon initially when gifSource is provided", () => {
    const instance = renderComponent();
    const playIcon = instance.root.findByProps({ testID: "antdesign-play" });
    expect(playIcon).toBeTruthy();
  });

  it("does not render play icon when gifSource is undefined", () => {
    const instance = renderComponent({ gifSource: undefined });
    const playIcons = instance.root.findAllByProps({ testID: "antdesign-play" });
    expect(playIcons).toHaveLength(0);
  });

  it("does not render expo Image initially", () => {
    const instance = renderComponent();
    const images = instance.root.findAllByProps({ testID: "expo-image" });
    expect(images).toHaveLength(0);
  });

  it("shows gif and hides svg when pressable is pressed", () => {
    const instance = renderComponent();
    act(() => getPressable(instance).props.onPress());

    const gifImage = instance.root.findByProps({ testID: "expo-image" });
    expect(gifImage).toBeTruthy();

    const svgs = instance.root.findAllByProps({ testID: "svg-renderer" });
    expect(svgs).toHaveLength(0);
  });

  it("toggles back to svg when pressed twice", () => {
    const instance = renderComponent();
    act(() => getPressable(instance).props.onPress());
    act(() => getPressable(instance).props.onPress());

    const svg = instance.root.findByProps({ testID: "svg-renderer" });
    expect(svg).toBeTruthy();

    const gifs = instance.root.findAllByProps({ testID: "expo-image" });
    expect(gifs).toHaveLength(0);
  });

  it("does not show gif when gifSource is undefined even after press", () => {
    const instance = renderComponent({ gifSource: undefined });
    act(() => getPressable(instance).props.onPress());

    const gifImages = instance.root.findAllByProps({ testID: "expo-image" });
    expect(gifImages).toHaveLength(0);

    const svg = instance.root.findByProps({ testID: "svg-renderer" });
    expect(svg).toBeTruthy();
  });

  it("passes correct props to SvgRenderer", () => {
    const instance = renderComponent({ svgSource: "mySvg" });
    const svg = instance.root.findByProps({ testID: "svg-renderer" });
    expect(svg.props["data-svgname"]).toBe("mySvg");
    expect(svg.props["data-width"]).toBe(200);
    expect(svg.props["data-height"]).toBe(200);
  });

  it("passes correct source to expo Image after press", () => {
    const instance = renderComponent();
    act(() => getPressable(instance).props.onPress());
    const gifImage = instance.root.findByProps({ testID: "expo-image" });
    expect(gifImage.props["data-source"]).toBe("path/to/test.gif");
  });

  it("applies custom style to ImageBackground", () => {
    const customStyle = { margin: 10 };
    const instance = renderComponent({ style: customStyle });
    const bg = instance.root.findByType(require("react-native").ImageBackground);
    expect(bg.props.style).toEqual(customStyle);
  });

  it("renders ImageBackground with correct background source", () => {
    const instance = renderComponent();
    const bg = instance.root.findByType(require("react-native").ImageBackground);
    expect(bg.props.source).toBe("z200.png");
  });
});
