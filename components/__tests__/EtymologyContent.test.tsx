import React from "react";
import renderer, { act } from "react-test-renderer";
import { EtymologyContent } from "./../selectedContent/EtymologyContent";
import { Evolution } from "@/types/Evolution";

// --- Mocks ---

jest.mock("./../ThemedView", () => {
  const { View } = require("react-native");
  return {
    ThemedView: ({ children, style }: any) => <View style={style}>{children}</View>,
  };
});

jest.mock("./../selectedContent/EtymologyView", () => ({
  EtymologyView: ({ svg, images, title, onEtymologyContent }: any) => {
    const { View, Text } = require("react-native");
    return (
      <View testID={`etymology-view-${title}`}>
        <Text testID={`etymology-title-${title}`} onPress={onEtymologyContent}>
          {title}
        </Text>
      </View>
    );
  },
}));

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

jest.mock("./../DescriptionView", () => ({
  DescriptionView: ({ description }: any) => {
    const { View, Text } = require("react-native");
    return (
      <View testID="description-view">
        {description.map((d: string, i: number) => (
          <Text key={i} testID={`description-text-${i}`}>{d}</Text>
        ))}
      </View>
    );
  },
}));

jest.mock("@expo/vector-icons/AntDesign", () => {
  const { Text } = require("react-native");
  return ({ name, size, color, style }: any) => (
    <Text testID={`antdesign-${name}`} data-size={size} data-color={color} style={style} />
  );
});

jest.mock("@/assets/data/etymology.json", () => ({
  etymology: [
    {
      title: "Oracle Bone",
      pinyin: "jiǎgǔwén",
      description: ["Ancient Chinese writing on bones.", "Used for divination."],
    },
    {
      title: "Bronze",
      pinyin: "jīnwén",
      description: ["Inscriptions on bronze vessels."],
    },
  ],
}));

// --- Fixtures ---

const mockEvolution: Evolution[] = [
  { title: "Oracle Bone", image: ["oracle1.png", "oracle2.png"] },
  { title: "Bronze", image: ["bronze1.png"] },
  { title: "Seal Script", image: ["seal1.png"] },
];

const defaultProps = {
  evolution: mockEvolution,
  unicode: "U+6C38",
};

const renderComponent = (overrides = {}) =>
  renderer.create(<EtymologyContent {...defaultProps} {...overrides} />);

// --- Tests ---

describe("EtymologyContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly and matches snapshot", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders an EtymologyView for each evolution item", () => {
    const instance = renderComponent();
    mockEvolution.forEach((item) => {
      const view = instance.root.findByProps({ testID: `etymology-view-${item.title}` });
      expect(view).toBeTruthy();
    });
  });

  it("renders caretdown arrows between items but not after the last", () => {
    const instance = renderComponent();
    // filter to only the top-level mock component nodes (not their internal Text children)
    const arrows = instance.root
      .findAllByProps({ testID: "antdesign-caretdown" })
      .filter((node) => node.type !== require("react-native").Text);
    expect(arrows).toHaveLength(mockEvolution.length - 1);
  });

  it("does not render any arrows when evolution has a single item", () => {
    const singleEvolution: Evolution[] = [{ title: "Oracle Bone", image: ["oracle1.png"] }];
    const instance = renderComponent({ evolution: singleEvolution });
    const arrows = instance.root
      .findAllByProps({ testID: "antdesign-caretdown" })
      .filter((node) => node.type !== require("react-native").Text);
    expect(arrows).toHaveLength(0);
  });

  it("modal is not visible initially", () => {
    const instance = renderComponent();
    const modal = instance.root.findByProps({ testID: "modal-dialog" });
    expect(modal.props["data-visible"]).toBe(false);
  });

  it("opens modal when an EtymologyView is pressed", () => {
    const instance = renderComponent();
    act(() => {
      instance.root
        .findByProps({ testID: "etymology-title-Oracle Bone" })
        .props.onPress();
    });
    const modal = instance.root.findByProps({ testID: "modal-dialog" });
    expect(modal.props["data-visible"]).toBe(true);
  });

  it("sets modal title with found etymology title and pinyin", () => {
    const instance = renderComponent();
    act(() => {
      instance.root
        .findByProps({ testID: "etymology-title-Oracle Bone" })
        .props.onPress();
    });
    const modalTitle = instance.root.findByProps({ testID: "modal-title" });
    expect(modalTitle.props.children).toBe("Oracle Bone  (jiǎgǔwén)");
  });

  it("sets modal title with just the title when etymology is not found in data", () => {
    const instance = renderComponent();
    act(() => {
      instance.root
        .findByProps({ testID: "etymology-title-Seal Script" })
        .props.onPress();
    });
    const modalTitle = instance.root.findByProps({ testID: "modal-title" });
    expect(modalTitle.props.children).toBe("Seal Script  ()");
  });

  it("shows fallback description when etymology is not found in data", () => {
    const instance = renderComponent();
    act(() => {
      instance.root
        .findByProps({ testID: "etymology-title-Seal Script" })
        .props.onPress();
    });
    const descText = instance.root.findByProps({ testID: "description-text-0" });
    expect(descText.props.children).toBe("Значение этого стиля не найдено");
  });

  it("shows correct description when etymology is found in data", () => {
    const instance = renderComponent();
    act(() => {
      instance.root
        .findByProps({ testID: "etymology-title-Oracle Bone" })
        .props.onPress();
    });
    const desc0 = instance.root.findByProps({ testID: "description-text-0" });
    const desc1 = instance.root.findByProps({ testID: "description-text-1" });
    expect(desc0.props.children).toBe("Ancient Chinese writing on bones.");
    expect(desc1.props.children).toBe("Used for divination.");
  });

  it("closes modal when onClose is called", () => {
    const instance = renderComponent();
    act(() => {
      instance.root
        .findByProps({ testID: "etymology-title-Oracle Bone" })
        .props.onPress();
    });
    act(() => {
      instance.root.findByProps({ testID: "modal-close" }).props.onPress();
    });
    const modal = instance.root.findByProps({ testID: "modal-dialog" });
    expect(modal.props["data-visible"]).toBe(false);
  });

  it("updates modal content when a different item is pressed", () => {
    const instance = renderComponent();
    act(() => {
      instance.root
        .findByProps({ testID: "etymology-title-Oracle Bone" })
        .props.onPress();
    });
    act(() => {
      instance.root
        .findByProps({ testID: "etymology-title-Bronze" })
        .props.onPress();
    });
    const modalTitle = instance.root.findByProps({ testID: "modal-title" });
    expect(modalTitle.props.children).toBe("Bronze  (jīnwén)");
  });

  it("renders with empty evolution array without crashing", () => {
    expect(() => renderComponent({ evolution: [] })).not.toThrow();
  });
});
