import { ICoordinates } from '@/types';

export const getKeyFromCoords = (coords: ICoordinates) => `${String.fromCharCode(coords.row + 65)}${coords.col}`;
