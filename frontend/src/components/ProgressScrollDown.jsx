import React, { useEffect, useState } from "react";

const ProgressScrollDown = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: `${scrollProgress}%`,
      height: "6px",
      backgroundColor: "white",
      zIndex: 100,
    }} />
  );
};

export default ProgressScrollDown;