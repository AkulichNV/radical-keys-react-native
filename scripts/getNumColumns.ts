export const getNumColumns = (
    isTablet: boolean, 
    windowWidth: number, 
    windowHeight: number 
) => {
  if (isTablet) {
    return windowWidth > windowHeight ? 12 : 8;
  }

  if (windowWidth > windowHeight) return 7;
  if (windowWidth < 440) return 5;
  return 6;
};