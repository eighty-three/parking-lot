import React, { useMemo } from 'react';

import { useParkingSlotsStore } from '@/store';
import { getKeyFromCoords } from '@/lib';
import { ICoordinates } from '@/types';
import { Car } from '@/components';

export const ParkingSlot = React.memo((props: { coords: ICoordinates }) => {
  const { coords } = props;
  const key = useMemo(() => getKeyFromCoords(coords), [coords]);
  const parkingSlots = useParkingSlotsStore((state) => state.parkingSlots);
  const slot = parkingSlots.find((slot) => slot.coordinates.row === coords.row && slot.coordinates.col === coords.col);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {`${key} || ${slot?.size}`}
      <hr />
      {slot?.parkedCar?.licensePlateNum && (
        <Car licensePlateNum={slot.parkedCar.licensePlateNum} isParked={true} size={slot.parkedCar.size} />
      )}
    </div>
  );
});
