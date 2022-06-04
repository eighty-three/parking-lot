import { TCarSize, ICoordinates } from '@/types';
import { useParkingSlotsStore } from '@/store';

export const findParkingSlot = (size: TCarSize, entry: ICoordinates) => {
  const parkingSlots = useParkingSlotsStore.getState().parkingSlots;
  const filteredParkingSlots = parkingSlots.filter((v) => size <= v.size && !v.parkedCar);

  let shortestDistance = Infinity;
  let slot = null;
  for (let i = 0; i < filteredParkingSlots.length; i++) {
    const currentSlot = filteredParkingSlots[i];
    const distance =
      Math.abs(currentSlot.coordinates.row - entry.row) + Math.abs(currentSlot.coordinates.col - entry.col);
    if (shortestDistance > distance) {
      shortestDistance = distance;
      slot = currentSlot;
    }
  }
  return slot;
};
