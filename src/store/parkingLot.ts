import create from 'zustand';

import { IDimensions } from '@/types';

type TParkingLotStore = {
  dimensions: IDimensions;
  setDimensions: (dimensions: IDimensions) => void;
};

export const useParkingLotStore = create<TParkingLotStore>((set) => ({
  dimensions: { rows: 6, cols: 6 },
  setDimensions: (dimensions) => set({ dimensions }),
}));
