import "../index.css";
//bg-gradient-to-r from-[#11cb46] via-green-600 to-[#04ba10]
const Preloader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex border-2 border-green-500 justify-center items-center z-50 bg-gradient-to-r from-[#01ff11] via-[#01ff11] to-[#01ff11] ">
      <svg viewBox="0 0 1320 300">
        <text
          x="50%"
          y="50%"
          dy=".35em"
          textAnchor="middle"
          className="uppercase animate-stroke text-8xl text-green-500"
        >
         Agro&nbsp;Tech&nbsp;&nbsp;AI
        </text>
      </svg>
    </div>
  );
};

export default Preloader;
