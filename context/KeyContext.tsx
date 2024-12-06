import { RadicalKeys } from "@/types/RadicalKeys";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface IKeyContext {
  data: RadicalKeys;
  setData: React.Dispatch<React.SetStateAction<RadicalKeys>>;
}

interface DataProviderProps {
  children: ReactNode;
}

const KeyContext = createContext<IKeyContext>();

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<RadicalKeys>();

  return (
    <KeyContext.Provider value={{ data, setData }}>
      {children}
    </KeyContext.Provider>
  );
};

export const useDataContext = (): IKeyContext => {
  const context = useContext(KeyContext);

  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }

  return context;
};
