import { useRouter } from "expo-router";

import dataKeys from '@/assets/data/radicalKeys.json';
import { useDataContext } from "@/context/KeyContext";
import { findCharacterById } from "@/scripts/findCharacterById";


export const useNavigateToRadical = () => {
  const router = useRouter();
  const { setData } = useDataContext();

  return (number: number, from: string | string[]) => {
    if (number === 0) {
      number = dataKeys.radicalKeys.length - 1;

    } if (number === dataKeys.radicalKeys.length) {
      number = 1;
    }
    const radicalKey = findCharacterById(dataKeys.radicalKeys, number);
    setData(radicalKey);
    router.push({
      pathname: '/keys/[key]',
      params: { key: number, from },
    });
  };
};
