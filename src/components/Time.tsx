import { useTimeStore } from '@/store';

export const Time = () => {
  const time = useTimeStore((state) => state.time);
  return (
    <div>
      <h1>Current time: {time}</h1>
      <button onClick={() => useTimeStore.getState().addTime(0.25)}>Add 15 minutes</button>
      <button onClick={() => useTimeStore.getState().addTime(1)}>Add Hour</button>
      <button onClick={() => useTimeStore.getState().addTime(12)}>Add 12 Hours</button>
    </div>
  );
};
