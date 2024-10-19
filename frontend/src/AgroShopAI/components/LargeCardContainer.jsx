const LargeCardContainer = ({items,text}) => {
    return (
      <div className="h-fit w-full pr-2 bg-white mx-2 my-4">
        <div className="border-b-2 bg-green-200 border-green-600">
  
          <h1 className="font-semibold py-1 ml-8 text-2xl text-black text-center">{text}</h1>
        </div>
        <div className="grid grid-cols-4 gap-4 p-6 mt-2 bg-green-100">
        {items.slice(0, 12).map((item, index) => {
            const savings = item.mrp - item.salePrice; // Calculate savings
            return (
              <div
                key={index}
                className="flex-shrink-0 w-60 h-80 bg-white rounded-lg overflow-hidden cursor-pointer relative"
                style={{
                    boxShadow: `rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
                                rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
                                rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px`
                  }}
              >
                <div className="w-full h-48">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-fill" // Use object-cover to fill the container
                  />
                  {/* Offer Tag */}
                  {item.offer && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-l-full z-10">
                      {item.offer}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-s font-semibold text-gray-800">{item.title}</h3>
                  <span className="text-gray-400 text-xs">{item.brand}</span>
                  <div className="flex items-center">
                    <p className="text-black text-m display-inline mr-2">₹{item.salePrice}</p>
                    <p className="text-gray-400 text-m display-inline line-through">₹{item.mrp}</p>
                  </div>
                  <p className="text-green-600 text-xs font-bold">You Save: ₹{savings.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default LargeCardContainer;
  