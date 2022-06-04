import React, { useCallback, useMemo, useState } from 'react';

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

  const sizeText = useMemo(() => {
    switch (size) {
      case 0:
        return 'small';
      case 1:
        return 'medium';
      case 2:
        return 'large';
    }
  }, [size]);

  return (
    <div>
      {`${licensePlateNum} || ${sizeText} ||`}
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
