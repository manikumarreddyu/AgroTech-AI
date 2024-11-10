import React from "react";

const SellerDetails = ({ seller }) => {
  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold">Seller Details</h3>
      <p>Name: {seller.name}</p>
      <p>Contact: {seller.contact}</p>
      <p>Location: {seller.location}</p>
    </div>
  );
};

export default SellerDetails;
