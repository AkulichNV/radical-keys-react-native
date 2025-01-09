import { RadicalKeys } from "@/types/RadicalKeys";

export const findCharacterById = (data: RadicalKeys[], id: number): RadicalKeys  => {
  const character = data.find((item) => item.number === id);
  if (!character) {
    throw new Error(`Character with id ${id} not found`);
  }
  return character;
  };
