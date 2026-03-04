import React from "react";
import renderer from "react-test-renderer";
import { SvgRenderer } from "./../SvgRenderer";

// --- Mocks ---

const MockSvg = ({ width, height, color }: any) => {
  const { View } = require("react-native");
  return <View testID="mock-svg" data-width={width} data-height={height} data-color={color} />;
};

const mockSvgModule = {
  testSvg: MockSvg,
  anotherSvg: MockSvg,
};

// --- Helpers ---

const defaultProps = {
  svgName: "testSvg",
  svgModule: mockSvgModule,
};

const renderComponent = (overrides = {}) =>
  renderer.create(<SvgRenderer {...defaultProps} {...overrides} />);

// --- Tests ---

describe("SvgRenderer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("renders correctly with valid svg and matches snapshot", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the SVG component when svgName exists in module", () => {
    const instance = renderComponent();
    const svg = instance.root.findByProps({ testID: "mock-svg" });
    expect(svg).toBeTruthy();
  });

  it("passes default width and height when not provided", () => {
    const instance = renderComponent();
    const svg = instance.root.findByProps({ testID: "mock-svg" });
    expect(svg.props["data-width"]).toBe(100);
    expect(svg.props["data-height"]).toBe(100);
  });

  it("passes default color when not provided", () => {
    const instance = renderComponent();
    const svg = instance.root.findByProps({ testID: "mock-svg" });
    expect(svg.props["data-color"]).toBe("#000001");
  });

  it("passes custom width and height to SVG component", () => {
    const instance = renderComponent({ width: 250, height: 300 });
    const svg = instance.root.findByProps({ testID: "mock-svg" });
    expect(svg.props["data-width"]).toBe(250);
    expect(svg.props["data-height"]).toBe(300);
  });

  it("passes custom color to SVG component", () => {
    const instance = renderComponent({ color: "#ff0000" });
    const svg = instance.root.findByProps({ testID: "mock-svg" });
    expect(svg.props["data-color"]).toBe("#ff0000");
  });

  it("renders correct SVG when svgName matches module key", () => {
    const instance = renderComponent({ svgName: "anotherSvg" });
    const svg = instance.root.findByProps({ testID: "mock-svg" });
    expect(svg).toBeTruthy();
  });

  it("returns null when svgName is not found in module", () => {
    const tree = renderComponent({ svgName: "nonExistent" }).toJSON();
    expect(tree).toBeNull();
  });

  it("logs console.error when svgName is not found", () => {
    renderComponent({ svgName: "nonExistent" });
    expect(console.error).toHaveBeenCalledWith(
      'SVG "nonExistent" not found in Svgs'
    );
  });

  it("does not log console.error when svgName is valid", () => {
    renderComponent();
    expect(console.error).not.toHaveBeenCalled();
  });

  it("returns null when svgModule is empty", () => {
    const tree = renderComponent({ svgModule: {} }).toJSON();
    expect(tree).toBeNull();
  });
});
