import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { nanoid } from 'nanoid';

import styles from '@/styles/Home.module.scss';
import { useCarsStore } from '@/store';
import { TCarSize } from '@/types';
import { Car, Time } from '@/components';

const Cars = () => {
  const cars = useCarsStore((state) => state.cars);
  return (
    <div>
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
      <Cars />
    </div>
  );
};

export default Home;
