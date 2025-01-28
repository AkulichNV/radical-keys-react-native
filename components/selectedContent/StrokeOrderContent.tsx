import { Calligraphy } from "@/types/Calligraphy";
import { StrokeOrderView } from "./StrokeOrderView";
import { ThemedView } from "../ThemedView";

export const StrokeOrderContent = ({ calligraphy }: { calligraphy: Calligraphy[] }) => (
  <ThemedView>
    {calligraphy.map((item, index) => (
      <StrokeOrderView
        key={index}
        gifSource={item.gif}
        svgSource={item.svg}
        strokeOrder={item.strokeOrder}
      />
    ))}
  </ThemedView>
);
