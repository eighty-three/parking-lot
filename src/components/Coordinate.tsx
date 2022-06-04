import { ICoordinates } from '@/types';
import { useParkingLotStore } from '@/store';
import { Entry, ParkingSlot } from '@/components';
import { isEdge, isBoundary, getKeyFromCoords } from '@/lib';

export const Coordinate = (props: { coords: ICoordinates }) => {
  const { coords } = props;
  const dimensions = useParkingLotStore((state) => state.dimensions);
  if (isEdge(coords, dimensions)) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        {getKeyFromCoords(coords)}
      </div>
    );
  }

  if (isBoundary(coords, dimensions)) {
    return <Entry coords={coords} />;
  }

  return <ParkingSlot coords={coords} />;
};
