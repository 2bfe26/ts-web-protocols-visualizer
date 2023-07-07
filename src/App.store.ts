import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEFAULT_VISUALIZATIONS } from "./App.constants";
import { V } from "./App.types";
import { parserV } from "./App.utils";

export type AppStore = {
  vs: V[];
  setV: (newV: V) => void;
  addV: (newV: V) => void;
  rmV: (id: string) => void;
};

export const useAppStore = create(
  persist<AppStore>(
    (set, get) => ({
      vs: DEFAULT_VISUALIZATIONS as V[],
      setV: (newV: V) => {
        const parsedNewV = { ...newV, parsed: parserV(newV.src) };

        set({
          vs: get().vs.map((v) => (v.id === parsedNewV.id ? parsedNewV : v)),
        });
      },

      addV: (newV: V) => {
        const parsedNewV = { ...newV, parsed: parserV(newV.src) };

        set({ vs: get().vs.concat([parsedNewV]) });
      },

      rmV: (id: string) =>
        confirm("Deseja realmente remover a visualização") &&
        set({ vs: get().vs.filter((v) => v.id !== id) }),
    }),
    { name: "ts-app-46" }
  )
);
