import React from "react";
import renderer from "react-test-renderer";
import { ThemedTextInput } from "./../ThemedTextInput";

// --- Mocks ---

jest.mock("@/hooks/useThemeColor", () => ({
  useThemeColor: ({ light }: { light?: string; dark?: string }, _key: string) =>
    light ?? "#000000",
}));

// --- Helpers ---

const renderComponent = (overrides = {}) =>
  renderer.create(<ThemedTextInput {...overrides} />);

const getInput = (instance: renderer.ReactTestRenderer) =>
  instance.root.findByType(require("react-native").TextInput);

const getContainer = (instance: renderer.ReactTestRenderer) =>
  instance.root.findByType(require("react-native").View);

const flatStyle = (style: any): any =>
  Array.isArray(style) ? Object.assign({}, ...style.map(flatStyle)) : style ?? {};

// --- Tests ---

describe("ThemedTextInput", () => {
  it("renders correctly with default props and matches snapshot", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a TextInput inside a View", () => {
    const instance = renderComponent();
    expect(getInput(instance)).toBeTruthy();
    expect(getContainer(instance)).toBeTruthy();
  });

  // --- Type styles ---

  it("applies default type styles when type is not provided", () => {
    const instance = renderComponent();
    const style = flatStyle(getInput(instance).props.style);
    expect(style.fontSize).toBe(16);
    expect(style.paddingHorizontal).toBe(12);
  });

  it("applies inputDefault styles when type='default'", () => {
    const instance = renderComponent({ type: "default" });
    const style = flatStyle(getInput(instance).props.style);
    expect(style.fontSize).toBe(16);
    expect(style.paddingHorizontal).toBe(12);
    expect(style.paddingVertical).toBe(10);
  });

  it("applies inputSearch styles when type='search'", () => {
    const instance = renderComponent({ type: "search" });
    const style = flatStyle(getInput(instance).props.style);
    expect(style.fontSize).toBe(16);
    expect(style.paddingHorizontal).toBe(12);
    expect(style.paddingVertical).toBe(10);
  });

  it("applies inputSubtitle styles when type='subtitle'", () => {
    const instance = renderComponent({ type: "subtitle" });
    const style = flatStyle(getInput(instance).props.style);
    expect(style.fontSize).toBe(18);
    expect(style.fontWeight).toBe("600");
  });

  it("applies inputCell styles when type='cell'", () => {
    const instance = renderComponent({ type: "cell" });
    const style = flatStyle(getInput(instance).props.style);
    expect(style.fontSize).toBe(20);
    expect(style.fontWeight).toBe("bold");
    expect(style.textAlign).toBe("center");
    expect(style.width).toBe(50);
  });

  // --- Colors ---

  it("applies text color from useThemeColor", () => {
    const instance = renderComponent({ lightColor: "#123456" });
    const style = flatStyle(getInput(instance).props.style);
    expect(style.color).toBe("#123456");
  });

  it("applies background color to container", () => {
    const instance = renderComponent({ lightBgColor: "#fafafa" });
    const containerStyle = flatStyle(getContainer(instance).props.style);
    expect(containerStyle.backgroundColor).toBe("#fafafa");
  });

  it("uses default placeholder color when placeholderTextColor is not provided", () => {
    const instance = renderComponent();
    expect(getInput(instance).props.placeholderTextColor).toBe("#6b7280");
  });

  it("uses custom placeholderTextColor when provided", () => {
    const instance = renderComponent({ placeholderTextColor: "#aabbcc" });
    expect(getInput(instance).props.placeholderTextColor).toBe("#aabbcc");
  });

  // --- Container styles ---

  it("applies containerStyle to the wrapper View", () => {
    const containerStyle = { margin: 20 };
    const instance = renderComponent({ containerStyle });
    const viewStyle = flatStyle(getContainer(instance).props.style);
    expect(viewStyle.margin).toBe(20);
  });

  it("applies base borderRadius to container", () => {
    const instance = renderComponent();
    const viewStyle = flatStyle(getContainer(instance).props.style);
    expect(viewStyle.borderRadius).toBe(40);
  });

  // --- Rest props forwarding ---

  it("forwards extra TextInput props like placeholder", () => {
    const instance = renderComponent({ placeholder: "Enter text..." });
    expect(getInput(instance).props.placeholder).toBe("Enter text...");
  });

  it("forwards value and onChangeText props", () => {
    const onChangeText = jest.fn();
    const instance = renderComponent({ value: "hello", onChangeText });
    expect(getInput(instance).props.value).toBe("hello");
    expect(getInput(instance).props.onChangeText).toBe(onChangeText);
  });

  it("forwards returnKeyType prop", () => {
    const instance = renderComponent({ returnKeyType: "done" });
    expect(getInput(instance).props.returnKeyType).toBe("done");
  });

  it("merges custom style with type style", () => {
    const customStyle = { borderWidth: 2 };
    const instance = renderComponent({ type: "default", style: customStyle });
    const style = flatStyle(getInput(instance).props.style);
    expect(style.fontSize).toBe(16);
    expect(style.borderWidth).toBe(2);
  });
});
