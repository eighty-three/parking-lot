import { useMemo } from 'react';

import { ICoordinates, IDimensions } from '@/types';
import { useParkingLotStore } from '@/store';

export const isEdge = (coords: ICoordinates, dimensions: IDimensions) => {
  if (
    (coords.row === 0 && coords.col === 0) ||
    (coords.row === 0 && coords.col === dimensions.cols - 1) ||
    (coords.row === dimensions.rows - 1 && coords.col === dimensions.cols - 1) ||
    (coords.row === dimensions.rows - 1 && coords.col === 0)
  ) {
    return true;
  }

  return false;
};

export const isBoundary = (coords: ICoordinates, dimensions: IDimensions) => {
  if (
    coords.row === 0 ||
    coords.row === dimensions.rows - 1 ||
    coords.col === 0 ||
    coords.col === dimensions.cols - 1
  ) {
    return true;
  }

  return false;
};

export const generateGrid = () => {
  const dimensions = useParkingLotStore((state) => state.dimensions);
  const arr = useMemo(() => {
    const coords = [];
    for (let i = 0; i < dimensions.rows; i++) {
      for (let j = 0; j < dimensions.cols; j++) {
        coords.push({ row: i, col: j });
      }
    }
    return coords;
  }, [dimensions]);

  return arr;
};
