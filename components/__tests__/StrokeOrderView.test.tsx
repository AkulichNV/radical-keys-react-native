import React from "react";
import renderer from "react-test-renderer";
import { StrokeOrderView } from "./../selectedContent/StrokeOrderView";

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

jest.mock("./../SvgGif", () => ({
  SvgGif: ({ gifSource, svgSource, style }: any) => {
    const { View } = require("react-native");
    return (
      <View
        testID="svg-gif"
        data-gifsource={gifSource}
        data-svgsource={svgSource}
        style={style}
      />
    );
  },
}));

// --- Helpers ---

const defaultProps = {
  svgSource: "testSvg",
  gifSource: "testGif",
};

const renderComponent = (overrides = {}) =>
  renderer.create(<StrokeOrderView {...defaultProps} {...overrides} />);

const flatStyle = (style: any): any =>
  Array.isArray(style) ? Object.assign({}, ...style.map(flatStyle)) : style ?? {};

// --- Tests ---

describe("StrokeOrderView", () => {
  it("renders correctly and matches snapshot", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders SvgGif with correct props", () => {
    const instance = renderComponent();
    const svgGif = instance.root.findByProps({ testID: "svg-gif" });
    expect(svgGif.props["data-svgsource"]).toBe("testSvg");
    expect(svgGif.props["data-gifsource"]).toBe("testGif");
  });

  it("passes undefined gifSource to SvgGif when not provided", () => {
    const instance = renderComponent({ gifSource: undefined });
    const svgGif = instance.root.findByProps({ testID: "svg-gif" });
    expect(svgGif.props["data-gifsource"]).toBeUndefined();
  });

  // --- strokeOrder ---

  it("renders no text when strokeOrder is not provided", () => {
    const instance = renderComponent({ strokeOrder: undefined });
    const texts = instance.root.findAllByType(require("react-native").Text);
    expect(texts).toHaveLength(0);
  });

  it("renders no text when strokeOrder is an empty array", () => {
    const instance = renderComponent({ strokeOrder: [] });
    const texts = instance.root.findAllByType(require("react-native").Text);
    expect(texts).toHaveLength(0);
  });

  it("renders a ThemedText for each strokeOrder paragraph", () => {
    const strokeOrder = ["Hold the brush lightly.", "Begin with a downstroke.", "Lift gently at the end."];
    const instance = renderComponent({ strokeOrder });
    const texts = instance.root.findAllByType(require("react-native").Text);
    expect(texts).toHaveLength(strokeOrder.length);
  });

  it("renders correct text content for each strokeOrder item", () => {
    const strokeOrder = ["First stroke.", "Second stroke."];
    const instance = renderComponent({ strokeOrder });
    const texts = instance.root.findAllByType(require("react-native").Text);
    expect(texts[0].props.children).toBe("First stroke.");
    expect(texts[1].props.children).toBe("Second stroke.");
  });

  it("renders a single strokeOrder paragraph correctly", () => {
    const instance = renderComponent({ strokeOrder: ["Only paragraph."] });
    const texts = instance.root.findAllByType(require("react-native").Text);
    expect(texts).toHaveLength(1);
    expect(texts[0].props.children).toBe("Only paragraph.");
  });

  // --- Custom style ---

  it("applies custom style to container", () => {
    const customStyle = { backgroundColor: "red" };
    const instance = renderComponent({ style: customStyle });
    const container = instance.root.findAllByType(require("react-native").View)[0];
    const style = flatStyle(container.props.style);
    expect(style.backgroundColor).toBe("red");
  });

  it("merges custom style with base container styles", () => {
    const instance = renderComponent({ style: { margin: 10 } });
    const container = instance.root.findAllByType(require("react-native").View)[0];
    const style = flatStyle(container.props.style);
    expect(style.margin).toBe(10);
    expect(style.alignItems).toBe("center");
  });
});
