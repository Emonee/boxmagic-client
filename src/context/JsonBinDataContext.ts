import { createContext } from "preact";
import type { BoxMagixConfig } from "../types/jsonBin";

export const JsonBinDataContext = createContext<BoxMagixConfig>(
  {} as BoxMagixConfig
);
