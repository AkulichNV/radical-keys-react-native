import { Evolution } from "@/types/Evolution";
import { EtymologyView } from "./EtymologyView";
import { ThemedView } from "../ThemedView";

export function EtymologyContent({
  evolution,
  unicode,
}: {
  evolution: Evolution[];
  unicode: string;
}) {
  return (
    <ThemedView>
      {evolution.map((item, index) => (
        <EtymologyView key={index} svg={unicode} images={item.image} title={item.title} />
      ))}
    </ThemedView>
  );
}
