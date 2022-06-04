import React, { useCallback, useState } from 'react';

import { useCarsStore } from '@/store';
import { TCarSize } from '@/types';
import { EntriesModal } from '@/components';

export const Car = React.memo((props: { licensePlateNum: string; isParked: boolean; size: TCarSize }) => {
  const { licensePlateNum, isParked, size } = props;

  const removeCar = useCallback((licensePlateNum: string) => {
    useCarsStore.getState().removeCar(licensePlateNum);
  }, []);

  const unparkCar = useCallback((licensePlateNum: string) => {
    useCarsStore.getState().unparkCar(licensePlateNum);
  }, []);

  return (
    <div>
      {`${licensePlateNum} || ${size} ||`}
      {!isParked ? (
        <>
          <ParkButton licensePlateNum={licensePlateNum} />
          <button onClick={() => removeCar(licensePlateNum)}>Remove Car</button>
        </>
      ) : (
        <button onClick={() => unparkCar(licensePlateNum)}>Unpark Car</button>
      )}
    </div>
  );
});

const ParkButton = React.memo((props: { licensePlateNum: string }) => {
  const { licensePlateNum } = props;
  const [isEntriesModalOpen, setEntriesModalOpen] = useState(false);

  return (
    <>
      {isEntriesModalOpen && (
        <EntriesModal onClose={() => setEntriesModalOpen(false)} licensePlateNum={licensePlateNum} />
      )}

      <button onClick={() => setEntriesModalOpen(true)}>Park Car</button>
    </>
  );
});
