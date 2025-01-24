import { Calligraphy } from "@/types/Calligraphy";
import { StrokeOrderView } from "./StrokeOrderView";
import { ThemedView } from "../ThemedView";

export function StrokeOrderContent({ calligraphy }: { calligraphy: Calligraphy[] }) {
  return (
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
}
