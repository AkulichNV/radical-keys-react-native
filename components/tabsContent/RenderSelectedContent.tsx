import { RadicalKeys } from "@/types/RadicalKeys";
import { ThemedText } from "../ThemedText";
import { DescriptionContent } from "./DiscriptionContent";
import { StrokeOrderContent } from "./StrokeOrderContent";
import { EtymologyContent } from "./EthimologyContent";

export function RenderSelectedContent({ value, radicalKey }: { value: string; radicalKey: RadicalKeys }) {
  const contentMap: Record<string, JSX.Element> = {
    'Определение': <DescriptionContent description={radicalKey.description.long} />,
    'Порядок черт': <StrokeOrderContent calligraphy={radicalKey.calligraphy} />,
    'Этимология': <EtymologyContent evolution={radicalKey.evolution} unicode={radicalKey.unicode} />,
  };

  return contentMap[value] || <ThemedText type="subtitle">{value}</ThemedText>;
}
