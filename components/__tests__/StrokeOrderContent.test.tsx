import React from "react";
import renderer from "react-test-renderer";
import { StrokeOrderContent } from "./../selectedContent/StrokeOrderContent";
import { Calligraphy } from "@/types/Calligraphy";

// --- Mocks ---

jest.mock("./../ThemedView", () => {
  const { View } = require("react-native");
  return {
    ThemedView: ({ children, style }: any) => <View style={style}>{children}</View>,
  };
});

jest.mock("./../selectedContent/StrokeOrderView", () => ({
  StrokeOrderView: ({ gifSource, svgSource, strokeOrder }: any) => {
    const { View } = require("react-native");
    return (
      <View
        testID={`stroke-order-view-${svgSource}`}
        data-gifsource={gifSource}
        data-svgsource={svgSource}
        data-strokeorder={strokeOrder}
      />
    );
  },
}));

// --- Fixtures ---

const mockCalligraphy: Calligraphy[] = [
  { svg: "svg1", gif: "gif1.gif", strokeOrder: ["step1", "step2"] },
  { svg: "svg2", gif: "gif2.gif", strokeOrder: ["stepA"] },
  { svg: "svg3" },
];

// --- Helpers ---

const renderComponent = (calligraphy: Calligraphy[] = mockCalligraphy) =>
  renderer.create(<StrokeOrderContent calligraphy={calligraphy} />);

// --- Tests ---

describe("StrokeOrderContent", () => {
  it("renders correctly and matches snapshot", () => {
    const tree = renderComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a StrokeOrderView for each calligraphy item", () => {
    const instance = renderComponent();
    const views = instance.root.findAllByType(require("react-native").View);
    const strokeViews = views.filter((v) =>
      v.props.testID?.startsWith("stroke-order-view-")
    );
    expect(strokeViews).toHaveLength(mockCalligraphy.length);
  });

  it("renders nothing when calligraphy array is empty", () => {
    const instance = renderComponent([]);
    const strokeViews = instance.root
      .findAllByType(require("react-native").View)
      .filter((v) => v.props.testID?.startsWith("stroke-order-view-"));
    expect(strokeViews).toHaveLength(0);
  });

  it("passes gifSource to each StrokeOrderView", () => {
    const instance = renderComponent();
    const view = instance.root.findByProps({ testID: "stroke-order-view-svg1" });
    expect(view.props["data-gifsource"]).toBe("gif1.gif");
  });

  it("passes svgSource to each StrokeOrderView", () => {
    const instance = renderComponent();
    const view = instance.root.findByProps({ testID: "stroke-order-view-svg2" });
    expect(view.props["data-svgsource"]).toBe("svg2");
  });

  it("passes strokeOrder to each StrokeOrderView", () => {
    const instance = renderComponent();
    const view = instance.root.findByProps({ testID: "stroke-order-view-svg1" });
    expect(view.props["data-strokeorder"]).toEqual(["step1", "step2"]);
  });

  it("passes undefined gifSource when gif is not provided", () => {
    const instance = renderComponent();
    const view = instance.root.findByProps({ testID: "stroke-order-view-svg3" });
    expect(view.props["data-gifsource"]).toBeUndefined();
  });

  it("passes undefined strokeOrder when strokeOrder is not provided", () => {
    const instance = renderComponent();
    const view = instance.root.findByProps({ testID: "stroke-order-view-svg3" });
    expect(view.props["data-strokeorder"]).toBeUndefined();
  });

  it("renders a single StrokeOrderView for a single item", () => {
    const single: Calligraphy[] = [{ svg: "onlySvg", gif: "only.gif" }];
    const instance = renderComponent(single);
    const view = instance.root.findByProps({ testID: "stroke-order-view-onlySvg" });
    expect(view).toBeTruthy();
  });
});
