export const getMarginCoefficient = (width: number) => {
  if (width <= 370) return 0.01;
  if (width > 370 && width <= 380) return 0.015;
  if (width > 380 && width <= 390) return 0.02;
  if (width > 390 && width <= 400) return 0.025;
  if (width > 400 && width <= 410) return 0.03;
  if (width > 410 && width <= 420) return 0.035;
  if (width > 420 && width <= 430) return 0.04;
  if (width > 430 && width < 440) return 0.045;
  return 0.01; // width >= 440
};
