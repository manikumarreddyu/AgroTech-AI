import React from "react";

const SellerSettingsPage = ({ sellerInfo }) => {
  return (
    <div>
      <h2>Settings</h2>
      <p>Name: {sellerInfo.name}</p>
      <p>Email: {sellerInfo.email}</p>
      <p>Store Name: {sellerInfo.storeName}</p>
      <p>Join Date: {sellerInfo.joinDate}</p>
      {/* Add settings options like password change, etc */}
    </div>
  );
};

export default SellerSettingsPage;
