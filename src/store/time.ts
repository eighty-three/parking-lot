import create from 'zustand';

type TTimeStore = {
  time: number;
  addTime: (time: number) => void;
};

export const useTimeStore = create<TTimeStore>((set, get) => ({
  time: 0,
  addTime: (time) => set({ time: get().time + time }),
}));
