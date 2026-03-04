import React from "react";
import renderer from "react-test-renderer";
import { ThemedView } from "./../ThemedView";

// --- Mocks ---

jest.mock("@/hooks/useThemeColor", () => ({
  useThemeColor: ({ light }: { light?: string; dark?: string }, _key: string) =>
    light ?? "#ffffff",
}));

// --- Helpers ---

const renderComponent = (overrides = {}, children?: React.ReactNode) =>
  renderer.create(<ThemedView {...overrides}>{children}</ThemedView>);

const getView = (instance: renderer.ReactTestRenderer) =>
  instance.root.findByType(require("react-native").View);

const flatStyle = (style: any): any =>
  Array.isArray(style) ? Object.assign({}, ...style.map(flatStyle)) : style ?? {};

// --- Tests ---

describe("ThemedView", () => {
  it("renders correctly with default props and matches snapshot", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a View", () => {
    const instance = renderComponent();
    expect(getView(instance)).toBeTruthy();
  });

  it("applies background color from useThemeColor", () => {
    const instance = renderComponent({ lightColor: "#f0f0f0" });
    const style = flatStyle(getView(instance).props.style);
    expect(style.backgroundColor).toBe("#f0f0f0");
  });

  it("applies default background color when no lightColor provided", () => {
    const instance = renderComponent();
    const style = flatStyle(getView(instance).props.style);
    expect(style.backgroundColor).toBe("#ffffff");
  });

  it("merges custom style with background color", () => {
    const instance = renderComponent({ style: { padding: 10, margin: 5 } });
    const style = flatStyle(getView(instance).props.style);
    expect(style.padding).toBe(10);
    expect(style.margin).toBe(5);
    expect(style.backgroundColor).toBe("#ffffff");
  });

  it("custom style overrides background color when both define it", () => {
    const instance = renderComponent({
      lightColor: "#aaaaaa",
      style: { backgroundColor: "#bbbbbb" },
    });
    const style = flatStyle(getView(instance).props.style);
    expect(style.backgroundColor).toBe("#bbbbbb");
  });

  it("forwards extra ViewProps like testID", () => {
    const instance = renderComponent({ testID: "themed-view" });
    const view = getView(instance);
    expect(view.props.testID).toBe("themed-view");
  });

  it("forwards accessibilityLabel prop", () => {
    const instance = renderComponent({ accessibilityLabel: "my view" });
    expect(getView(instance).props.accessibilityLabel).toBe("my view");
  });

  it("renders children correctly", () => {
    const { Text } = require("react-native");
    const instance = renderComponent({}, <Text testID="child">Hello</Text>);
    const child = instance.root.findByProps({ testID: "child" });
    expect(child.props.children).toBe("Hello");
  });

  it("renders multiple children", () => {
    const { Text } = require("react-native");
    const instance = renderComponent(
      {},
      <>
        <Text testID="child-1">One</Text>
        <Text testID="child-2">Two</Text>
      </>
    );
    expect(instance.root.findByProps({ testID: "child-1" })).toBeTruthy();
    expect(instance.root.findByProps({ testID: "child-2" })).toBeTruthy();
  });

  it("renders without children without crashing", () => {
    expect(() => renderComponent()).not.toThrow();
  });
});
