import React, { useCallback, useEffect } from 'react';
import type { NextPage } from 'next';
import { nanoid } from 'nanoid';

import styles from '@/styles/Home.module.scss';
import { useCarsStore, useParkingLotStore, useEntriesMapStore, useEntriesStore } from '@/store';
import { TCarSize } from '@/types';
import { Car, Coordinate, Time } from '@/components';
import { generateGrid, getKeyFromCoords, shuffle, isBoundary, isEdge } from '@/lib';

const MIN_ENTRIES = 3;
const Grid = () => {
  const layout = generateGrid();
  const dimensions = useParkingLotStore((state) => state.dimensions);

  useEffect(() => {
    const arr = shuffle(layout)
      .filter((coords) => isBoundary(coords, dimensions) && !isEdge(coords, dimensions))
      .slice(0, MIN_ENTRIES);
    useEntriesStore.getState().setInitialEntries(arr);
    useEntriesMapStore.getState().setInitialEntriesMap(arr);
  }, [layout]);

  const BASE_WIDTH = 150;
  const BASE_HEIGHT = 150;

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: `${BASE_WIDTH * dimensions.rows}px`,
          height: `${BASE_HEIGHT * dimensions.cols}px`,
          flexWrap: 'wrap',
        }}
      >
        {layout.map((v) => (
          <div key={getKeyFromCoords(v)} style={{ width: `${BASE_WIDTH}px`, height: `${BASE_HEIGHT}px` }}>
            <Coordinate coords={v} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Cars = () => {
  const cars = useCarsStore((state) => state.cars);
  return (
    <div style={{ width: '500px', marginTop: '20px' }}>
      {cars.map((car) => (
        <Car
          key={car.licensePlateNum}
          licensePlateNum={car.licensePlateNum}
          isParked={!!car.parkingSlotID}
          size={car.size}
        />
      ))}
    </div>
  );
};

const CreateCars = () => {
  const createCar = useCallback((num?: TCarSize) => {
    const size = num ?? (Math.floor(Math.random() * 3) as TCarSize);
    const licensePlateNum = nanoid(8);
    useCarsStore.getState().addCar({ size, licensePlateNum, parkingSlotID: null });
  }, []);

  return (
    <div>
      Generate Car
      <button onClick={() => createCar()}>Random</button>
      <button onClick={() => createCar(0)}>Small</button>
      <button onClick={() => createCar(1)}>Medium</button>
      <button onClick={() => createCar(2)}>Large</button>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Time />
      <CreateCars />
      <div style={{ display: 'flex' }}>
        <Cars />
        <Grid />
      </div>
    </div>
  );
};

export default Home;
