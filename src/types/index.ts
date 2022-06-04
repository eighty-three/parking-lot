export type TCarSize = 0 | 1 | 2;
export interface ICar {
  size: TCarSize;
  licensePlateNum: string;
  start?: number;
  end?: number;
}
