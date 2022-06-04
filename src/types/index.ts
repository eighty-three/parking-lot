export type TCarSize = 0 | 1 | 2;
export interface ICar {
  size: TCarSize;
  licensePlateNum: string;
  start?: number;
  end?: number;
}

export interface IParkingSlot {
  size: TCarSize;
  parkedCar: string | null;
  coordinates: ICoordinates;
  ID: string;
}

export interface ICoordinates {
  row: number;
  col: number;
}
