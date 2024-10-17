import { RadicalKeys } from "@/types/RadicalKeys";

export const groupCharactersByStrokes = (data: RadicalKeys[]): Record<number, RadicalKeys[]> => {
  return data.reduce((acc, character) => {
    const { strokeNumber } = character;
    if (!acc[strokeNumber]) {
      acc[strokeNumber] = [];
    }
    acc[strokeNumber].push(character);
    return acc;
  }, {} as Record<number, RadicalKeys[]>);
};