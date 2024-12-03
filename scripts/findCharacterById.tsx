import { RadicalKeys } from "@/types/RadicalKeys";

export const findCharacterById = (data: RadicalKeys[], id: number): RadicalKeys => {
  const character = data.filter((item: RadicalKeys, index) => {
    return item.number === id;
  })
  console.log(character);

    return character[0];
  };
