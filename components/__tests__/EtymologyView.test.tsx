import React from "react";
import renderer, { act } from "react-test-renderer";
import { EtymologyView } from "./../selectedContent/EtymologyView";

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

jest.mock("./../SvgRenderer", () => ({
  SvgRenderer: ({ svgName, width, height }: any) => {
    const { View } = require("react-native");
    return (
      <View
        testID={`svg-renderer-${svgName}`}
        data-svgname={svgName}
        data-width={width}
        data-height={height}
      />
    );
  },
}));

jest.mock("@/assets/images/evolution/evolutionSvgs", () => ({
  evolutionSvgs: {
    "U+6C38": {
      oracle1: "mock-oracle1",
      oracle2: "mock-oracle2",
      bronze1: "mock-bronze1",
    },
  },
}));

// --- Helpers ---

const defaultProps = {
  svg: "U+6C38",
  images: ["oracle1", "oracle2"],
  title: "甲",
  onEtymologyContent: jest.fn(),
};

const renderComponent = (overrides = {}) =>
  renderer.create(<EtymologyView {...defaultProps} {...overrides} />);

const getPressables = (instance: renderer.ReactTestRenderer) =>
  instance.root.findAllByType(require("react-native").Pressable);

// --- Tests ---

describe("EtymologyView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly and matches snapshot", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  // --- Title rendering ---

  it("renders each character of title as a separate ThemedText", () => {
    const title = "甲骨文";
    const instance = renderComponent({ title });
    const texts = instance.root.findAllByType(require("react-native").Text);
    const titleChars = texts.filter((t) =>
      title.split("").includes(t.props.children)
    );
    expect(titleChars).toHaveLength(title.length);
  });

  it("renders single character title correctly", () => {
    const instance = renderComponent({ title: "甲" });
    const texts = instance.root.findAllByType(require("react-native").Text);
    const charText = texts.find((t) => t.props.children === "甲");
    expect(charText).toBeTruthy();
  });

  // --- Image / Pressable rendering ---

  it("renders a Pressable for each image", () => {
    const instance = renderComponent({ images: ["oracle1", "oracle2"] });
    expect(getPressables(instance)).toHaveLength(2);
  });

  it("renders a single Pressable for a single image", () => {
    const instance = renderComponent({ images: ["oracle1"] });
    expect(getPressables(instance)).toHaveLength(1);
  });

  it("renders no Pressables when images array is empty", () => {
    const instance = renderComponent({ images: [] });
    expect(getPressables(instance)).toHaveLength(0);
  });

  it("renders SvgRenderer for each image with correct svgName", () => {
    const instance = renderComponent({ images: ["oracle1", "oracle2"] });
    expect(instance.root.findByProps({ testID: "svg-renderer-oracle1" })).toBeTruthy();
    expect(instance.root.findByProps({ testID: "svg-renderer-oracle2" })).toBeTruthy();
  });

  it("passes correct width and height to SvgRenderer", () => {
    const instance = renderComponent({ images: ["oracle1"] });
    const svg = instance.root.findByProps({ testID: "svg-renderer-oracle1" });
    expect(svg.props["data-width"]).toBe(80);
    expect(svg.props["data-height"]).toBe(80);
  });

  // --- Callback ---

  it("calls onEtymologyContent when a Pressable is pressed", () => {
    const onEtymologyContent = jest.fn();
    const instance = renderComponent({ onEtymologyContent });
    act(() => getPressables(instance)[0].props.onPress());
    expect(onEtymologyContent).toHaveBeenCalledTimes(1);
  });

  it("calls onEtymologyContent for each pressable independently", () => {
    const onEtymologyContent = jest.fn();
    const instance = renderComponent({ onEtymologyContent, images: ["oracle1", "oracle2"] });
    act(() => getPressables(instance)[0].props.onPress());
    act(() => getPressables(instance)[1].props.onPress());
    expect(onEtymologyContent).toHaveBeenCalledTimes(2);
  });

  // --- Custom style ---

  it("applies custom style to the container", () => {
    const customStyle = { margin: 20 };
    const instance = renderComponent({ style: customStyle });
    const views = instance.root.findAllByType(require("react-native").View);
    const container = views[0];
    const flatStyle = (s: any): any =>
      Array.isArray(s) ? Object.assign({}, ...s.map(flatStyle)) : s ?? {};
    const style = flatStyle(container.props.style);
    expect(style.margin).toBe(20);
  });
});
