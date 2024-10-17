import { Calligraphy } from "./Calligraphy"
import { Description } from "./Description"
import { Evolution } from "./Evolution"

export interface RadicalKeys {
  number: number,
  hanzi: string,
  strokeNumber: number,
  pinyin: string,
  sound: string,
  unicode: string,
  description: Description,
  calligraphy: Calligraphy[],
  evolution: Evolution[]
}