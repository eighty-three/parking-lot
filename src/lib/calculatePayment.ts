const DAY_RATE = 5000;
const BASE_PAYMENT = 40;
const BASE_HOURS = 3;

export const calculatePayment = (
  current: number,
  start: number,
  rate: number,
  prevPayment: number,
  prevHours: number,
  prevRate: number,
) => {
  const totalHours = Math.ceil(current - start);

  const remainingHours = totalHours % 24;
  const hoursPayment = getHoursPayment(totalHours, remainingHours, rate);

  const days = Math.floor(totalHours / 24);
  const daysPayment = days * DAY_RATE;

  let adjustment = 0;
  if (
    // base payment is same for all sizes
    prevHours > BASE_HOURS &&
    // decimals means overlap in stay
    prevHours % 1 !== 0 &&
    // only adjusts for increases, no refunds!
    prevRate > rate &&
    // full day pay is always 5000
    !!remainingHours
  ) {
    adjustment = prevRate - rate;
  }

  // prevPayment included for continuous rates
  return hoursPayment + daysPayment + adjustment - prevPayment;
};

const getHoursPayment = (totalHours: number, remainingHours: number, rate: number) => {
  const basePayment = BASE_PAYMENT;
  if (totalHours <= BASE_HOURS) return basePayment;

  if (totalHours < 24) {
    return (remainingHours - BASE_HOURS) * rate + basePayment;
  }

  // if more than 24 hours
  return remainingHours * rate;
};
