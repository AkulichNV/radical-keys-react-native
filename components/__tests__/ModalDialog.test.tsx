import React from "react";
import renderer, { act } from "react-test-renderer";
import { ModalDialog } from "./../ModalDialog";

// --- Mocks ---

jest.mock("./../ThemedView", () => {
  const { View } = require("react-native");
  return {
    ThemedView: ({ children, style, onStartShouldSetResponder }: any) => (
      <View style={style} onStartShouldSetResponder={onStartShouldSetResponder}>
        {children}
      </View>
    ),
  };
});

jest.mock("./../ThemedText", () => {
  const { Text } = require("react-native");
  return {
    ThemedText: ({ children, style }: any) => <Text style={style}>{children}</Text>,
  };
});

jest.mock("@expo/vector-icons", () => ({
  AntDesign: ({ name, color, size }: any) => {
    const { Text } = require("react-native");
    return <Text testID={`antdesign-${name}`} data-color={color} data-size={size} />;
  },
}));

// --- Helpers ---

const defaultProps = {
  isVisible: true,
  title: "Test Title",
  onClose: jest.fn(),
};

const renderComponent = (overrides = {}, children?: React.ReactNode) =>
  renderer.create(
    <ModalDialog {...defaultProps} {...overrides}>
      {children}
    </ModalDialog>
  );

// --- Tests ---

describe("ModalDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when visible and matches snapshot", () => {
    const tree = renderComponent({}, <></>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when not visible and matches snapshot", () => {
    const tree = renderComponent({ isVisible: false }).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes visible=true to Modal when isVisible is true", () => {
    const instance = renderComponent({ isVisible: true });
    const modal = instance.root.findByType(require("react-native").Modal);
    expect(modal.props.visible).toBe(true);
  });

  it("passes visible=false to Modal when isVisible is false", () => {
    const instance = renderComponent({ isVisible: false });
    const modal = instance.root.findByType(require("react-native").Modal);
    expect(modal.props.visible).toBe(false);
  });

  it("renders the title text correctly", () => {
    const instance = renderComponent({ title: "My Dialog" });
    const texts = instance.root.findAllByType(require("react-native").Text);
    const titleText = texts.find((t) => t.props.children === "My Dialog");
    expect(titleText).toBeTruthy();
  });

  it("renders children inside ScrollView", () => {
    const { Text } = require("react-native");
    const instance = renderComponent(
      {},
      <Text testID="child-content">Child Content</Text>
    );
    const child = instance.root.findByProps({ testID: "child-content" });
    expect(child).toBeTruthy();
    expect(child.props.children).toBe("Child Content");
  });

  it("calls onClose when the close icon Pressable is pressed", () => {
    const onClose = jest.fn();
    const instance = renderComponent({ onClose });
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    const closeIconPress = pressables.find(
      (p) => p.props.onPress === onClose && !p.props.style
    );
    act(() => closeIconPress?.props.onPress());
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the background overlay Pressable is pressed", () => {
    const onClose = jest.fn();
    const instance = renderComponent({ onClose });
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    const backgroundPress = pressables.find(
      (p) => p.props.onPress === onClose && p.props.style
    );
    act(() => backgroundPress?.props.onPress());
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders exactly two Pressable elements", () => {
    const instance = renderComponent();
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    expect(pressables).toHaveLength(2);
  });

  it("renders the AntDesign close icon", () => {
    const instance = renderComponent();
    const closeIcon = instance.root.findByProps({ testID: "antdesign-close" });
    expect(closeIcon).toBeTruthy();
  });

  it("sets animationType to 'slide' on Modal", () => {
    const instance = renderComponent();
    const modal = instance.root.findByType(require("react-native").Modal);
    expect(modal.props.animationType).toBe("slide");
  });

  it("sets transparent to true on Modal", () => {
    const instance = renderComponent();
    const modal = instance.root.findByType(require("react-native").Modal);
    expect(modal.props.transparent).toBe(true);
  });

  it("renders ScrollView with correct keyboard props", () => {
    const instance = renderComponent();
    const scrollView = instance.root.findByType(require("react-native").ScrollView);
    expect(scrollView.props.keyboardShouldPersistTaps).toBe("handled");
    expect(scrollView.props.keyboardDismissMode).toBe("interactive");
  });
});
