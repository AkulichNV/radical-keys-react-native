import React from "react";
import renderer from "react-test-renderer";
import { DescriptionView } from "./../DescriptionView";

jest.mock("./../ThemedView", () => {
  const { View } = require("react-native");
  return {
    ThemedView: ({ children, style }: { children: React.ReactNode; style?: object }) => (
      <View style={style}>{children}</View>
    ),
  };
});

jest.mock("./../ThemedText", () => {
  const { Text } = require("react-native");
  return {
    ThemedText: ({ children, style }: { children: React.ReactNode; style?: object }) => (
      <Text style={style}>{children}</Text>
    ),
  };
});

describe("DescriptionView", () => {
  it("renders correctly with a list of paragraphs", () => {
    const description = ["First paragraph", "Second paragraph", "Third paragraph"];
    const tree = renderer.create(<DescriptionView description={description} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders fallback text when description array is empty", () => {
    const tree = renderer.create(<DescriptionView description={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders fallback text when first element is an empty string", () => {
    const tree = renderer.create(<DescriptionView description={[""]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a single paragraph correctly", () => {
    const description = ["Only one paragraph"];
    const instance = renderer.create(<DescriptionView description={description} />);
    const root = instance.root;

    const texts = root.findAllByType(require("react-native").Text);
    expect(texts).toHaveLength(1);
    expect(texts[0].props.children).toBe("Only one paragraph");
  });

  it("renders the correct number of paragraphs", () => {
    const description = ["Para 1", "Para 2", "Para 3"];
    const instance = renderer.create(<DescriptionView description={description} />);
    const root = instance.root;

    const texts = root.findAllByType(require("react-native").Text);
    expect(texts).toHaveLength(3);
  });

  it("renders fallback 'Нет описания' text when description is empty", () => {
    const instance = renderer.create(<DescriptionView description={[]} />);
    const root = instance.root;

    const texts = root.findAllByType(require("react-native").Text);
    expect(texts).toHaveLength(1);
    expect(texts[0].props.children).toBe("Нет описания");
  });

  it("applies custom style to the wrapper view", () => {
    const customStyle = { backgroundColor: "red" };
    const instance = renderer.create(
      <DescriptionView description={["Test"]} style={customStyle} />
    );
    const root = instance.root;

    const view = root.findByType(require("react-native").View);
    expect(view.props.style).toEqual(customStyle);
  });

  it("renders paragraph text content correctly", () => {
    const description = ["Hello", "World"];
    const instance = renderer.create(<DescriptionView description={description} />);
    const root = instance.root;

    const texts = root.findAllByType(require("react-native").Text);
    expect(texts[0].props.children).toBe("Hello");
    expect(texts[1].props.children).toBe("World");
  });
});
