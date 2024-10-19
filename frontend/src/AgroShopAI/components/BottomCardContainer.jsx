import DisplayCard from "./DisplayCard";

const BottomCardContainer = ({items,text}) => {
    return (
      <div className="h-fit w-full pr-2 bg-white mx-2 mt-4">
        <div className="border-b-2 bg-green-200 border-green-600">
  
          <h1 className="font-semibold py-1 ml-8 text-2xl text-black text-center">{text}</h1>
        </div>
        <div className="grid grid-cols-4 gap-4 p-6 mt-2 bg-green-100">
        {items.slice(0, 12).map((item, index) => { // Calculate savings
            return (
              <div className="justify-center mx-auto" key={index}>

                <DisplayCard item= {item}/>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default BottomCardContainer;
  