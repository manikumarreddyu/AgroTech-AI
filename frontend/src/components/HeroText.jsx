import { TypewriterEffectSmooth } from "./ui/TypeWriter";

export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "👋 Welcome",
      className: "md:text-3xl lg:text-4xl text-white text-typing ",
    },
    {
      text: "To",
      className: "text-white lg:text-4xl md:text-3xl text-typing",
    },
    {
      text: "AgroTech",
      className: "text-blue-500 lg:text-4xl md:text-3xl  text-typing ",
    },
    {
      text: "AI",
      className: "text-blue-500 lg:text-4xl md:text-3xl text-typing",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="mx-autofont-bold mb-4 ">
        <TypewriterEffectSmooth words={words} />
      </div>
    </div>
  );
}
