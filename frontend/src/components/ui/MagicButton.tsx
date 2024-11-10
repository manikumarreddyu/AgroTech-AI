import React from "react";

const MagicButton = ({ title }: { title: string }) => {
  return (
    <>
      <button className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none transition-transform duration-300 transform hover:scale-105 hover:-translate-y-1">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#fff_50%,#045e03_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-green-500 px-7 text-sm font-medium text-white backdrop-blur-3xl">
          {title}
        </span>
      </button>
    </>
  );
};

export default MagicButton;
