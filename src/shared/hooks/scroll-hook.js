import { useEffect, useRef } from "react";

export const useHorizontalScroll = () => {
  const elementRef = useRef();

  useEffect(() => {
    const element = elementRef.current;

    if (element) {
      const onWheel = (e) => {
        if (e.deltaY !== 0) return;
        e.preventDefault();
        console.log("trying");
        element.scrollTo({
          left: element.scrollLeft + e.deltaY,
        //   behavior: "smooth",
        });
      };

      element.addEventListener("wheel", onWheel);
      return () => element.removeEventListener("wheel", onWheel);
    }
  }, []);
  
  return elementRef;
};
