import create from 'zustand';

import { ICar, ICoordinates } from '@/types';
import { calculatePayment, findParkingSlot } from '@/lib';
import { useTimeStore, useParkingSlotsStore } from '@/store';

type TCarsStore = {
  cars: ICar[];
  addCar: (car: ICar) => void;
  removeCar: (licensePlateNum: string) => void;
  parkCar: (licensePlateNum: string, entry: ICoordinates) => void;
  unparkCar: (licensePlateNum: string) => void;
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
  parkCar: (licensePlateNum: string, entry: ICoordinates) => {
    const time = useTimeStore.getState().time;

    const cars = get().cars;
    const car = cars.find((car) => car.licensePlateNum === licensePlateNum)!;

    const slot = findParkingSlot(car.size, entry);
    if (!slot) return false;

    const end = car.end ?? 0;
    let start = time;
    let lastPayment = 0;

    // if existing car and an hour hasn't passed from end time
    if (car.start != null && time - end <= 1) {
      start = car.start!;
      lastPayment = car.lastPayment ?? 0;
    }

    useParkingSlotsStore.getState().updateParkingSlot(slot.ID, licensePlateNum);
    set({
      cars: cars.map((car) =>
        car.licensePlateNum === licensePlateNum
          ? { ...car, parkingSlotID: slot.ID, start, end, lastPayment }
          : { ...car },
      ),
    });
  },
  unparkCar: (licensePlateNum: string) => {
    const time = useTimeStore.getState().time;

    const cars = get().cars;
    const car = cars.find((car) => car.licensePlateNum === licensePlateNum)!;

    const slots = useParkingSlotsStore.getState().parkingSlots;
    const slot = slots.find((slot) => slot.parkedCar === licensePlateNum)!;
    const prevSlot = slots.find((slot) => slot.ID === car.prevParkingSlotID);

    const rate = 20 + slot.size * 40;
    const prevRate = prevSlot ? 20 + prevSlot.size * 40 : 0;

    const lastPayment = car.lastPayment ?? 0;
    let prevHours = car.end || 0 - car.start!;
    // should only be positive for continuous rates
    if (prevHours < 0) {
      prevHours = 0;
    }
    const payment = calculatePayment(time, car.start!, rate, lastPayment, prevHours, prevRate);

    useParkingSlotsStore.getState().updateParkingSlot(slot.ID, null);
    set({
      cars: cars.map((car) =>
        car.licensePlateNum === licensePlateNum
          ? {
              ...car,
              end: time,
              lastPayment: lastPayment + payment,
              parkingSlotID: null,
              prevParkingSlotID: car.parkingSlotID,
            }
          : { ...car },
      ),
    });
  },
}));
