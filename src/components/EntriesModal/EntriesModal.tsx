import { useCallback, useState } from 'react';

import { useEntriesStore, useCarsStore } from '@/store';
import { getKeyFromCoords } from '@/lib';
import { ICoordinates } from '@/types';

import modalStyles from './EntriesModal.module.scss';

interface EntriesModalProps {
  onClose: () => void;
  licensePlateNum: string;
}
export const EntriesModal = (props: EntriesModalProps) => {
  const { onClose, licensePlateNum } = props;
  const entries = useEntriesStore((state) => state.entries);
  const [isFull, setIsFull] = useState(false);

  const parkCar = useCallback(
    (licensePlateNum: string, entry: ICoordinates) => {
      const hasSlot = useCarsStore.getState().parkCar(licensePlateNum, entry);
      if (!hasSlot) {
        setIsFull(true);
        return;
      }
      onClose();
    },
    [onClose],
  );

  return (
    <>
      <div onClick={onClose} className={modalStyles.modal} />

      <div className={modalStyles.container}>
        {isFull && 'Parking Lot is full'}
        <div style={{ height: '100%' }}>
          {entries.map((entry) => (
            <button
              key={getKeyFromCoords(entry)}
              className={modalStyles.button}
              onClick={() => parkCar(licensePlateNum, entry)}
            >
              {getKeyFromCoords(entry)}
            </button>
          ))}
        </div>
        <button className={modalStyles.button__close} onClick={onClose}>
          close modal
        </button>
      </div>
    </>
  );
};
