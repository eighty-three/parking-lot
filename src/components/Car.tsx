import React, { useCallback, useMemo } from 'react';

import { useCarsStore } from '@/store';
import { TCarSize } from '@/types';

export const Car = React.memo((props: { licensePlateNum: string; isParked: boolean; size: TCarSize }) => {
  const { licensePlateNum, isParked, size } = props;

  const removeCar = useCallback((licensePlateNum: string) => {
    useCarsStore.getState().removeCar(licensePlateNum);
  }, []);

  const parkCar = useCallback((licensePlateNum: string) => {
    console.log(licensePlateNum);
    //useCarsStore.getState().parkCar(licensePlateNum, entry);
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
          <button onClick={() => parkCar(licensePlateNum)}>Park Car</button>
          <button onClick={() => removeCar(licensePlateNum)}>Remove Car</button>
        </>
      ) : (
        <button onClick={() => unparkCar(licensePlateNum)}>Unpark Car</button>
      )}
    </div>
  );
});
