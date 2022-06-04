import { TCarSize, ICoordinates, IParkingSlot } from '@/types';
import { useParkingSlotsStore } from '@/store';

interface IDistance {
  slot: IParkingSlot | null;
  distance: number;
}
type TDistances = {
  [K in TCarSize]: IDistance;
};
export const findParkingSlot = (size: TCarSize, entry: ICoordinates) => {
  const parkingSlots = useParkingSlotsStore.getState().parkingSlots;
  const filteredParkingSlots = parkingSlots.filter((v) => size <= v.size && !v.parkedCar);

  const distances: TDistances = {
    0: { slot: null, distance: Infinity },
    1: { slot: null, distance: Infinity },
    2: { slot: null, distance: Infinity },
  };
  for (let i = 0; i < filteredParkingSlots.length; i++) {
    const currentSlot = filteredParkingSlots[i];
    const size = currentSlot.size;
    const distance =
      Math.abs(currentSlot.coordinates.row - entry.row) + Math.abs(currentSlot.coordinates.col - entry.col);

    if (distances[size].distance > distance) {
      distances[size].distance = distance;
      distances[size].slot = currentSlot;
    }
  }

  let val = size;
  while (val < 3) {
    if (distances[val].slot) {
      return distances[val].slot;
    }
    val++;
  }

  return null;
};
