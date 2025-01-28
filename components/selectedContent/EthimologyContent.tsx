import { Evolution } from "@/types/Evolution";
import { EtymologyView } from "./EtymologyView";
import { ThemedView } from "../ThemedView";

interface IEtymologyContent {
  evolution: Evolution[];
  unicode: string;
}

export const EtymologyContent = ({
  evolution,
  unicode,
}: IEtymologyContent) => (
    <ThemedView>
      {evolution.map((item, index) => (
        <EtymologyView key={index} svg={unicode} images={item.image} title={item.title} />
      ))}
    </ThemedView>
  );
