/* hook for getting browser’s screen size*/
import { useState, useEffect } from "react";

export interface IScreenSize {
  width: number;
  height: number;
  isSmallScreen: boolean;
}

const SMALL_SCREEN_SIZE = 600;

export const useWindowSize = (): IScreenSize => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return { width, height, isSmallScreen: width <= SMALL_SCREEN_SIZE };
};
