export type TCarSize = 0 | 1 | 2;
export interface ICar {
  size: TCarSize;
  licensePlateNum: string;
  start?: number;
  end?: number;
  parkingSlotID: string | null;
  prevParkingSlotID?: string | null;
  lastPayment?: number;
}

export interface IParkedCar {
  licensePlateNum: string;
  size: TCarSize;
}
export interface IParkingSlot {
  size: TCarSize;
  parkedCar: IParkedCar | null;
  coordinates: ICoordinates;
  ID: string;
}

export interface ICoordinates {
  row: number;
  col: number;
}

export interface WithChildren {
  children: React.ReactNode;
}

export interface IDimensions {
  rows: number;
  cols: number;
}
