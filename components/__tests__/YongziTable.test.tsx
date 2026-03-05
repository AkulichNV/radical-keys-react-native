import React from "react";
import renderer, { act } from "react-test-renderer";
import { YongziTable } from "./../YongziTable";

// --- Mocks ---

jest.mock("./../ThemedText", () => {
  const { Text } = require("react-native");
  return {
    ThemedText: ({ children, style }: any) => <Text style={style}>{children}</Text>,
  };
});

jest.mock("./../ModalDialog", () => ({
  ModalDialog: ({ isVisible, onClose, title, children }: any) => {
    const { View, Text } = require("react-native");
    return (
      <View testID="modal-dialog" data-visible={isVisible}>
        <Text testID="modal-title">{title}</Text>
        <Text testID="modal-close" onPress={onClose} />
        {children}
      </View>
    );
  },
}));

jest.mock("expo-image", () => ({
  Image: ({ source, style, contentFit }: any) => {
    const { View } = require("react-native");
    return <View testID="expo-image" data-source={source} style={style} data-contentfit={contentFit} />;
  },
  ImageBackground: ({ source, children, imageStyle, contentFit }: any) => {
    const { View } = require("react-native");
    return (
      <View testID="expo-image-background" data-source={source} style={imageStyle} data-contentfit={contentFit}>
        {children}
      </View>
    );
  },
}));

const mockUseColorScheme = jest.fn(() => "light");
jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
  default: mockUseColorScheme,
}));

const mockStrokes = [
  { id: 1, chinese: "永", pinyin: "yǒng", description: "Horizontal", image: "stroke1" },
  { id: 2, chinese: "字", pinyin: "zì",  description: "Vertical",   image: "stroke2" },
];

jest.mock("@/assets/data/yongziStrokes.json", () => ({
  yongziStrokes: [
    { id: 1, chinese: "永", pinyin: "yǒng", description: "Horizontal", image: "stroke1" },
    { id: 2, chinese: "字", pinyin: "zì",  description: "Vertical",   image: "stroke2" },
  ],
}));

jest.mock("@/assets/images/yongzi/yongzi", () => ({
  yongzi: {
    stroke1: "path/to/stroke1.png",
    stroke2: "path/to/stroke2.png",
  },
}));

jest.mock("@/assets/images/lightGridBackground.png", () => "lightGridBackground.png");

// --- Helpers ---

const renderComponent = () => renderer.create(<YongziTable />);

// --- Tests ---

describe("YongziTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseColorScheme.mockReturnValue("light");
  });

  it("renders correctly and matches snapshot", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a row for each stroke item", () => {
    const instance = renderComponent();
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    expect(pressables).toHaveLength(mockStrokes.length);
  });

  it("renders chinese and pinyin text for each item", () => {
    const instance = renderComponent();
    const texts = instance.root.findAllByType(require("react-native").Text);
    const yongText = texts.find((t) =>
      Array.isArray(t.props.children)
        ? t.props.children.includes("永")
        : t.props.children === "永"
    );
    expect(yongText).toBeTruthy();
  });

  it("renders description text for each item", () => {
    const instance = renderComponent();
    const texts = instance.root.findAllByType(require("react-native").Text);
    const descText = texts.find((t) => t.props.children === "Horizontal");
    expect(descText).toBeTruthy();
  });

  it("renders an image for each row", () => {
    const instance = renderComponent();
    const images = instance.root.findAllByProps({ testID: "expo-image" });
    // one per row (modal image only renders when selectedItem is set)
    expect(images.length).toBeGreaterThanOrEqual(mockStrokes.length);
  });

  it("modal is not visible initially", () => {
    const instance = renderComponent();
    const modal = instance.root.findByProps({ testID: "modal-dialog" });
    expect(modal.props["data-visible"]).toBe(false);
  });

  it("opens modal with correct title when a row is pressed", () => {
    const instance = renderComponent();
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    act(() => pressables[0].props.onPress());

    const modal = instance.root.findByProps({ testID: "modal-dialog" });
    expect(modal.props["data-visible"]).toBe(true);

    const modalTitle = instance.root.findByProps({ testID: "modal-title" });
    expect(modalTitle.props.children).toBe("Horizontal");
  });

  it("opens modal with correct title for second row", () => {
    const instance = renderComponent();
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    act(() => pressables[1].props.onPress());

    const modalTitle = instance.root.findByProps({ testID: "modal-title" });
    expect(modalTitle.props.children).toBe("Vertical");
  });

  it("closes modal and resets selectedItem when onClose is called", () => {
    const instance = renderComponent();
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    act(() => pressables[0].props.onPress());

    const closeButton = instance.root.findByProps({ testID: "modal-close" });
    act(() => closeButton.props.onPress());

    const modal = instance.root.findByProps({ testID: "modal-dialog" });
    expect(modal.props["data-visible"]).toBe(false);

    const modalTitle = instance.root.findByProps({ testID: "modal-title" });
    expect(modalTitle.props.children).toBe("");
  });

  it("renders modal image only when an item is selected", () => {
    const instance = renderComponent();

    // before press — modal image should not exist
    const beforeImages = instance.root
      .findAllByProps({ testID: "expo-image" })
      .filter((img) => img.props["data-source"] === "path/to/stroke1.png" && img.props.style?.height === 450);
    expect(beforeImages).toHaveLength(0);

    // after press — modal image should appear
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    act(() => pressables[0].props.onPress());

    const afterImages = instance.root
      .findAllByProps({ testID: "expo-image" })
      .filter((img) => img.props.style?.height === 450);
    expect(afterImages.length).toBeGreaterThan(0);
  });

  it("applies light theme row styles", () => {
    mockUseColorScheme.mockReturnValue("light");
    const instance = renderComponent();
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    const rowStyle = [pressables[0].props.style].flat().find((s: any) => s?.backgroundColor);
    expect(rowStyle?.backgroundColor).toBe("#fff6e4");
    expect(rowStyle?.borderColor).toBe("#cccc99");
    expect(rowStyle?.borderWidth).toBe(2.5);
  });

  it("applies dark theme row styles", () => {
    mockUseColorScheme.mockReturnValue("dark");
    const instance = renderComponent();
    const pressables = instance.root.findAllByType(require("react-native").Pressable);
    const rowStyle = [pressables[0].props.style].flat().find((s: any) => s?.backgroundColor);
    expect(rowStyle?.backgroundColor).toBe("#010606");
    expect(rowStyle?.borderColor).toBe("#272f3a");
    expect(rowStyle?.borderWidth).toBe(1);
  });
});
