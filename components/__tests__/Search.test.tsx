import React from "react";
import renderer, { act } from "react-test-renderer";
import Search from "./../Search";

// --- Mocks ---

jest.mock("./../ThemedTextInput", () => {
  const { TextInput } = require("react-native");
  return {
    ThemedTextInput: ({ value, onChangeText, placeholder, style, returnKeyType }: any) => (
      <TextInput
        testID="search-input"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={style}
        returnKeyType={returnKeyType}
      />
    ),
  };
});

const mockUseColorScheme = jest.fn(() => "light");
jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
  default: mockUseColorScheme,
}));

// --- Helpers ---

const renderComponent = (overrides = {}) =>
  renderer.create(<Search {...overrides} />);

const getInput = (instance: renderer.ReactTestRenderer) =>
  instance.root.findByProps({ testID: "search-input" });

// --- Tests ---

describe("Search", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseColorScheme.mockReturnValue("light");
  });

  it("renders correctly with default props and matches snapshot", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with custom placeholder", () => {
    const instance = renderComponent({ placeholder: "Find something..." });
    const input = getInput(instance);
    expect(input.props.placeholder).toBe("Find something...");
  });

  it("renders with default placeholder when none provided", () => {
    const instance = renderComponent();
    const input = getInput(instance);
    expect(input.props.placeholder).toBe("Искать...");
  });

  it("renders with empty initial query value", () => {
    const instance = renderComponent();
    const input = getInput(instance);
    expect(input.props.value).toBe("");
  });

  it("updates query state when text changes", () => {
    const instance = renderComponent();
    act(() => {
      getInput(instance).props.onChangeText("hello");
    });
    expect(getInput(instance).props.value).toBe("hello");
  });

  it("calls onSearch with trimmed text when typing", () => {
    const onSearch = jest.fn();
    const instance = renderComponent({ onSearch });
    act(() => {
      getInput(instance).props.onChangeText("  dragon  ");
    });
    expect(onSearch).toHaveBeenCalledWith("dragon");
  });

  it("calls onSearch on every text change", () => {
    const onSearch = jest.fn();
    const instance = renderComponent({ onSearch });
    act(() => { getInput(instance).props.onChangeText("a"); });
    act(() => { getInput(instance).props.onChangeText("ab"); });
    act(() => { getInput(instance).props.onChangeText("abc"); });
    expect(onSearch).toHaveBeenCalledTimes(3);
    expect(onSearch).toHaveBeenLastCalledWith("abc");
  });

  it("does not crash when onSearch is not provided", () => {
    const instance = renderComponent();
    expect(() => {
      act(() => { getInput(instance).props.onChangeText("test"); });
    }).not.toThrow();
  });

  it("sets returnKeyType to 'search'", () => {
    const instance = renderComponent();
    expect(getInput(instance).props.returnKeyType).toBe("search");
  });

  it("applies light theme styles to container", () => {
    mockUseColorScheme.mockReturnValue("light");
    const instance = renderComponent();
    const container = instance.root.findByType(require("react-native").View);
    expect(container.props.style.borderWidth).toBe(2.5);
    expect(container.props.style.borderColor).toBe("#cccc99");
    expect(container.props.style.backgroundColor).toBe("#fff6e4");
  });

  it("applies dark theme styles to container", () => {
    mockUseColorScheme.mockReturnValue("dark");
    const instance = renderComponent();
    const container = instance.root.findByType(require("react-native").View);
    expect(container.props.style.borderWidth).toBe(1);
    expect(container.props.style.borderColor).toBe("#272f3a");
    expect(container.props.style.backgroundColor).toBe("#010606");
  });

  it("calls onSearch with empty string when input is cleared", () => {
    const onSearch = jest.fn();
    const instance = renderComponent({ onSearch });
    act(() => { getInput(instance).props.onChangeText("hello"); });
    act(() => { getInput(instance).props.onChangeText(""); });
    expect(onSearch).toHaveBeenLastCalledWith("");
  });
});
