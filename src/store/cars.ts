import create from 'zustand';

import { ICar } from '@/types';

type TCarsStore = {
  cars: ICar[];
  addCar: (car: ICar) => void;
  removeCar: (licensePlateNum: string) => void;
};

export const useCarsStore = create<TCarsStore>((set, get) => ({
  cars: [],
  addCar: (car: ICar) => {
    const cars = get().cars;
    set({ cars: [...cars, car] });
  },
  removeCar: (licensePlateNum: string) => {
    const cars = get().cars;
    set({ cars: cars.filter((car) => licensePlateNum !== car.licensePlateNum) });
  },
}));
