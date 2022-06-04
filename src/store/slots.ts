import create from 'zustand';

import { IParkingSlot, IParkedCar } from '@/types';

type TParkingSlotsStore = {
  parkingSlots: IParkingSlot[];
  setParkingSlots: (parkingSlots: IParkingSlot[]) => void;
  updateParkingSlot: (ID: string, parkedCar: IParkedCar | null) => void;
};

export const useParkingSlotsStore = create<TParkingSlotsStore>((set, get) => ({
  parkingSlots: [],
  setParkingSlots: (parkingSlots) => set({ parkingSlots }),
  updateParkingSlot: (ID, parkedCar) => {
    const parkingSlots = get().parkingSlots;
    set({
      parkingSlots: parkingSlots.map((slot) => (slot.ID === ID ? { ...slot, parkedCar } : { ...slot })),
    });
  },
}));
