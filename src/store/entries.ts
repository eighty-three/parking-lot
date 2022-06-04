import create from 'zustand';

import { ICoordinates } from '@/types';
import { getKeyFromCoords } from '@/lib';

type TEntriesStore = {
  entries: ICoordinates[];
  setInitialEntries: (coords: ICoordinates[]) => void;
  addEntry: (coords: ICoordinates) => void;
  hasInitialized: boolean;
};

export const useEntriesStore = create<TEntriesStore>((set, get) => ({
  hasInitialized: false,
  entries: [],
  setInitialEntries: (coords) => {
    const sortedEntries = coords
      .map((v) => ({ ...v, name: getKeyFromCoords(v) }))
      .sort((a, b) => a.name.localeCompare(b.name));
    const hasInitialized = get().hasInitialized;
    if (!hasInitialized) {
      set({ entries: sortedEntries, hasInitialized: true });
    }
  },
  addEntry: (coords) => {
    const entries = get().entries;
    entries.push(coords);
    const sortedEntries = entries
      .map((v) => ({ ...v, name: getKeyFromCoords(v) }))
      .sort((a, b) => a.name.localeCompare(b.name));
    set({ entries: sortedEntries });
  },
}));

type TEntriesMapStore = {
  [key: string]: any;
  setInitialEntriesMap: (coords: ICoordinates[]) => void;
  addEntryToMap: (coords: ICoordinates) => void;
  hasInitialized: boolean;
};

export const useEntriesMapStore = create<TEntriesMapStore>((set, get) => ({
  hasInitialized: false,
  setInitialEntriesMap: (coords) => {
    const hasInitialized = get().hasInitialized;
    if (!hasInitialized) {
      const map = get();
      const fixedMap = coords.reduce((prev, cur) => ({ ...prev, [getKeyFromCoords(cur)]: { ...cur } }), map);

      // prevent overwrite of other methods
      const setInitialEntriesMap = get().setInitialEntriesMap;
      const addEntryToMap = get().addEntryToMap;
      set({ ...fixedMap, setInitialEntriesMap, addEntryToMap, hasInitialized: true });
    }
  },
  addEntryToMap: (coords) => set({ [getKeyFromCoords(coords)]: { ...coords } }),
}));
