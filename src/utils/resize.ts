import { useEffect, useState } from "react";

 export const resizeWidth = ()=>{
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);// Sự kiện resize
      return () => {
        window.removeEventListener("resize", handleResize);// Xóa sự kiện resize
      };
    }, []);
    return width;
}
export const resizeHeight = ()=>{
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
      const handleResize = () => {
        setHeight(window.innerHeight);
      };
  
      window.addEventListener("resize", handleResize);// Sự kiện resize
      return () => {
        window.removeEventListener("resize", handleResize);// Xóa sự kiện resize
      };
    }, []);
    return height;
}