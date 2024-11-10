import React from "react";
import RentOrderTracking from "./sub-component/OrderTracking";
import FAQ from "./sub-component/Fa";
import LiveChat from "./sub-component/Livechat";


const RentSupportPage = () => {
  return (
    <div className="container mx-auto p-6 mt-14">
      <h1 className="text-4xl font-bold text-center mb-8">Customer Support</h1>

      {/* Live Chat Support Section */}
      <div className="mb-8">
        <div className="p-6 bg-white  ">
          <LiveChat />
        </div>
      </div>

      {/* Help Center & FAQ Section */}
      <div className="mb-8">
        <div className="p-6 bg-white ">
          <FAQ />
        </div>
      </div>

      {/* Order Tracking Section */}
      <div className="mb-8">
        <div className="p-6 bg-white ">
          <RentOrderTracking />
        </div>
      </div>
    </div>
  );
};
export default RentSupportPage;
