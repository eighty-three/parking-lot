import { ICoordinates } from '@/types';
import { useParkingLotStore } from '@/store';
import { Entry } from '@/components';
import { isEdge, isBoundary } from '@/lib';

export const Coordinate = (props: { coords: ICoordinates }) => {
  const { coords } = props;
  const dimensions = useParkingLotStore((state) => state.dimensions);
  if (isEdge(coords, dimensions)) {
    return <></>;
  }

  if (isBoundary(coords, dimensions)) {
    return <Entry coords={coords} />;
  }

  return <></>;
  //return <ParkingSlot coords={coords} />;
};
