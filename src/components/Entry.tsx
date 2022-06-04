import React, { useMemo, useCallback } from 'react';

import { useEntriesStore, useEntriesMapStore } from '@/store';
import { getKeyFromCoords } from '@/lib';
import { ICoordinates } from '@/types';

export const Entry = React.memo((props: { coords: ICoordinates }) => {
  const { coords } = props;
  const key = useMemo(() => getKeyFromCoords(coords), [coords]);
  const entry = useEntriesMapStore((state) => state[key]);

  const addEntry = useCallback((coords: ICoordinates) => {
    useEntriesStore.getState().addEntry(coords);
    useEntriesMapStore.getState().addEntryToMap(coords);
  }, []);

  if (entry) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'white',
          background: '#2f4f4f',
        }}
      >
        {key}
      </div>
    );
  }

  return (
    <button style={{ height: '100%', width: '100%' }} onClick={() => addEntry(coords)}>
      {key}
    </button>
  );
});
