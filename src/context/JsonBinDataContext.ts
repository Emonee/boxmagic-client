import { createContext } from "preact";
import type { BoxMagixConfig } from "../types/jsonBin";

export const JsonBinDataContext = createContext<{
  data: BoxMagixConfig;
  refetch?: () => void;
}>({} as { data: BoxMagixConfig });
