import React from "react";
import renderer, { act } from "react-test-renderer";
import { ContentView } from "./../selectedContent/ContentView";
import { Calligraphy } from "@/types/Calligraphy";
import { Evolution } from "@/types/Evolution";

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

jest.mock("./../selectedContent/StrokeOrderContent", () => ({
  StrokeOrderContent: ({ calligraphy }: any) => {
    const { View } = require("react-native");
    return <View testID="stroke-order-content" data-calligraphy={calligraphy} />;
  },
}));

jest.mock("./../selectedContent/EtymologyContent", () => ({
  EtymologyContent: ({ evolution, unicode }: any) => {
    const { View } = require("react-native");
    return (
      <View testID="etymology-content" data-evolution={evolution} data-unicode={unicode} />
    );
  },
}));

jest.mock("@expo/vector-icons/build/FontAwesome5", () => {
  const { Text } = require("react-native");
  return ({ name, size }: any) => (
    <Text testID={`fontawesome5-${name}`} data-size={size} />
  );
});

// --- Fixtures ---

const mockCalligraphy: Calligraphy[] = [
  { svg: "stroke1", gif: "stroke1.gif", strokeOrder: ["step1", "step2"] },
];

const mockEvolution: Evolution[] = [
  { title: "Oracle Bone", image: ["evo1.png", "evo2.png"] },
];

const defaultProps = {
  isStrokeOrder: true,
  strokeOrder: jest.fn(),
  etymology: jest.fn(),
  calligraphy: mockCalligraphy,
  evolution: mockEvolution,
  unicode: "U+6C38",
  backgroundColorPress: "#aabbcc",
  backgroundActive: "#ff0000",
};

const renderComponent = (overrides = {}) =>
  renderer.create(<ContentView {...defaultProps} {...overrides} />);

const getPressables = (instance: renderer.ReactTestRenderer) =>
  instance.root.findAllByType(require("react-native").Pressable);

const flatStyle = (style: any): any =>
  Array.isArray(style) ? Object.assign({}, ...style.map(flatStyle)) : style ?? {};

// --- Tests ---

describe("ContentView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly and matches snapshot", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders exactly two Pressable tab buttons", () => {
    const instance = renderComponent();
    expect(getPressables(instance)).toHaveLength(2);
  });

  // --- Tab button icons ---

  it("renders pen-fancy icon for stroke order tab", () => {
    const instance = renderComponent();
    const icon = instance.root.findByProps({ testID: "fontawesome5-pen-fancy" });
    expect(icon).toBeTruthy();
  });

  it("renders scroll icon for etymology tab", () => {
    const instance = renderComponent();
    const icon = instance.root.findByProps({ testID: "fontawesome5-scroll" });
    expect(icon).toBeTruthy();
  });

  // --- Tab button callbacks ---

  it("calls strokeOrder when stroke order tab is pressed", () => {
    const strokeOrder = jest.fn();
    const instance = renderComponent({ strokeOrder });
    act(() => getPressables(instance)[0].props.onPress());
    expect(strokeOrder).toHaveBeenCalledTimes(1);
  });

  it("calls etymology when etymology tab is pressed", () => {
    const etymology = jest.fn();
    const instance = renderComponent({ etymology });
    act(() => getPressables(instance)[1].props.onPress());
    expect(etymology).toHaveBeenCalledTimes(1);
  });

  // --- Active tab highlighting ---

  it("applies backgroundActive to stroke order tab when isStrokeOrder is true", () => {
    const instance = renderComponent({ isStrokeOrder: true });
    const style = flatStyle(getPressables(instance)[0].props.style);
    expect(style.backgroundColor).toBe("#ff0000");
  });

  it("applies backgroundColorPress to etymology tab when isStrokeOrder is true", () => {
    const instance = renderComponent({ isStrokeOrder: true });
    const style = flatStyle(getPressables(instance)[1].props.style);
    expect(style.backgroundColor).toBe("#aabbcc");
  });

  it("applies backgroundActive to etymology tab when isStrokeOrder is false", () => {
    const instance = renderComponent({ isStrokeOrder: false });
    const style = flatStyle(getPressables(instance)[1].props.style);
    expect(style.backgroundColor).toBe("#ff0000");
  });

  it("applies backgroundColorPress to stroke order tab when isStrokeOrder is false", () => {
    const instance = renderComponent({ isStrokeOrder: false });
    const style = flatStyle(getPressables(instance)[0].props.style);
    expect(style.backgroundColor).toBe("#aabbcc");
  });

  // --- Content switching ---

  it("renders StrokeOrderContent when isStrokeOrder is true", () => {
    const instance = renderComponent({ isStrokeOrder: true });
    expect(instance.root.findByProps({ testID: "stroke-order-content" })).toBeTruthy();
  });

  it("does not render EtymologyContent when isStrokeOrder is true", () => {
    const instance = renderComponent({ isStrokeOrder: true });
    expect(instance.root.findAllByProps({ testID: "etymology-content" })).toHaveLength(0);
  });

  it("renders EtymologyContent when isStrokeOrder is false", () => {
    const instance = renderComponent({ isStrokeOrder: false });
    expect(instance.root.findByProps({ testID: "etymology-content" })).toBeTruthy();
  });

  it("does not render StrokeOrderContent when isStrokeOrder is false", () => {
    const instance = renderComponent({ isStrokeOrder: false });
    expect(instance.root.findAllByProps({ testID: "stroke-order-content" })).toHaveLength(0);
  });

  // --- Props forwarding ---

  it("passes calligraphy prop to StrokeOrderContent", () => {
    const calligraphy: Calligraphy[] = [{ svg: "custom_svg", strokeOrder: ["a", "b"] }];
    const instance = renderComponent({ calligraphy });
    const content = instance.root.findByProps({ testID: "stroke-order-content" });
    expect(content.props["data-calligraphy"]).toEqual(calligraphy);
  });

  it("passes evolution and unicode props to EtymologyContent", () => {
    const evolution: Evolution[] = [{ title: "Bronze", image: ["bronze.png"] }];
    const instance = renderComponent({ isStrokeOrder: false, evolution, unicode: "U+1234" });
    const content = instance.root.findByProps({ testID: "etymology-content" });
    expect(content.props["data-evolution"]).toEqual(evolution);
    expect(content.props["data-unicode"]).toBe("U+1234");
  });
});
