import React, { useCallback, useMemo } from 'react';

import { useCarsStore } from '@/store';
import { TCarSize } from '@/types';

export const Car = React.memo((props: { licensePlateNum: string; size: TCarSize }) => {
  const { licensePlateNum, size } = props;

  const removeCar = useCallback((licensePlateNum: string) => {
    useCarsStore.getState().removeCar(licensePlateNum);
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
      <button onClick={() => removeCar(licensePlateNum)}>Remove Car</button>
    </div>
  );
});
