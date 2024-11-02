import React, { useState } from "react";

const ShopProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+1",
    addresses: [
      {
        label: "Home",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        isDefault: true,
      },
    ],
  });
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedCardType, setSelectedCardType] = useState("Visa");
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");


  const handleAddPaymentMethod = (event) => {
    event.preventDefault();

    const newPaymentMethod = {
      type: selectedCardType,
      lastFour: cardNumber.slice(-4),
      expiry: expiryDate,
      holderName: holderName,
      logo:
        selectedCardType === "Visa"
          ? "https://storage.googleapis.com/a1aa/image/id8topenT93KMii2p2h4rGV1UpeTeaQOEIy9WT6KwyBQEKZnA.jpg"
          :"https://storage.googleapis.com/a1aa/image/tnrRDTY20O53INprOfEjaewhe9E4tQig91qm3vFGV07NEKZnA.jpg"
           
    };

    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    // Reset the fields after adding
    setCardNumber("");
    setHolderName("");
    setExpiryDate("");
  };

  const handleRemovePaymentMethod = (index) => {
    const updatedMethods = paymentMethods.filter((_, i) => i !== index);
    setPaymentMethods(updatedMethods);
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedAddresses = [...prevData.addresses];
      updatedAddresses[index] = { ...updatedAddresses[index], [name]: value };
      return { ...prevData, addresses: updatedAddresses };
    });
  };

  const toggleEditMode = () => setIsEditing(!isEditing);

  const handleAddAddress = () => {
    setFormData((prevData) => ({
      ...prevData,
      addresses: [
        ...prevData.addresses,
        {
          label: "Other",
          address: "",
          city: "",
          state: "",
          zip: "",
          country: "",
          isDefault: false,
        },
      ],
    }));
  };

  const handleRemoveAddress = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      addresses: prevData.addresses.filter((_, i) => i !== index),
    }));
  };

  const handleSetDefault = (index) => {
    setFormData((prevData) => {
      const updatedAddresses = prevData.addresses.map((addr, i) => ({
        ...addr,
        isDefault: i === index,
      }));
      return { ...prevData, addresses: updatedAddresses };
    });
  };

  const handleLabelChange = (index, label) => {
    setFormData((prevData) => {
      const updatedAddresses = [...prevData.addresses];
      updatedAddresses[index].label = label;
      return { ...prevData, addresses: updatedAddresses };
    });
  };

  const countryCodes = [
    { code: "+1", label: "United States" },
    { code: "+91", label: "India" },
    { code: "+44", label: "United Kingdom" },
    { code: "+61", label: "Australia" },
    // Add more country codes as needed
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex bg-gray-800">
      <div className="w-full p-6 bg-white shadow-md m-2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img
              src="https://storage.googleapis.com/a1aa/image/W8eSBCFvmhW5VCeZFUBgnkFDO1nfxYkrZI46t46E5ewUIUyOB.jpg"
              alt="Profile picture of a person"
              className="w-24 h-24 rounded-full"
              width="100"
              height="100"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Your Profile</h2>
            </div>
          </div>
          <div>
            <button className="text-green-500 border rounded-md hover:bg-green-500 hover:text-white px-4 py-2 mx-2 rounded-md">
              CHANGE PASSWORD
            </button>
            <button
              onClick={toggleEditMode}
              className={`text-red-500 hover:bg-red-500 border hover:text-white px-4 py-2 rounded-md ${
                isEditing ? "bg-red-500 text-white" : ""
              }`}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        {/* Name, Email, and Phone */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              className="w-full mt-1 p-2 border rounded-md"
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              className="w-full mt-1 p-2 border rounded-md"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <div className="flex mt-1">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={(e) =>
                  setFormData({ ...formData, countryCode: e.target.value })
                }
                disabled={!isEditing}
                className="border rounded-md p-2 w-fit mr-2"
              >
                {countryCodes.map((country, index) => (
                  <option key={index} value={country.code}>
                    ({country.code})
                  </option>
                ))}
              </select>
              <input
                className="w-1/2 p-2 border rounded-md"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  // Only update state if the value is numeric
                  const numericValue = e.target.value.replace(/\D/g, ""); // Remove any non-numeric characters
                  setFormData((prevData) => ({
                    ...prevData,
                    phone: numericValue,
                  }));
                }}
                disabled={!isEditing}
                placeholder="Phone Number"
              />
            </div>
          </div>
        </div>

        {/* Password Change Button */}

        {/* Address Section */}
        <div className="mt-4 flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-700 ">Addresses</h3>
            {isEditing && (
              <div className="flex p-1 text-white hover:bg-blue-200 border rounded-md">
                <button onClick={handleAddAddress} className="">
                  <img
                    width={20}
                    height={20}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACV0lEQVR4nO1ZvW4TQRBeGUxBCaHi5wFoIDtOZCqeIgLBgwTRuEvok8iZseABgoCCn4anAMEDAKEhtmecyqbZaM6WIyVB3vPt3e2h+6SpztZ93+3c7LffGVOjRo3M2Dhwl1b3Rw8syXNAeQPE34FkCMR/pyVDi/JNr+lvLI3apuMapmy0Xg1uW5QXQHIIJC5NWZRfQLy9Tv1bhRO///L4BqAgIE/SEj9XyBOL3AU8XimEPKA8sciDzMTPrghxv4XyOEfirgkkvdDE4byQfb1XYPK/r1riT3mTh/n7wR/1noHIu2aR5GG+EvL57oG7kl1AAW0D/16JbibyluRpWeRhVqs9ebQU+bWd0XUgPipbgNWJt8yITeZ8yeRhXryXirzujlk3qbPIJAB5Aji84y1gZg9cNAIoWYVtP/Yd15j6lNgEyKGaxoX81VWG6NscBDjoyfri9lFLHKsAlGcLBQDK21gFWJTXi1dADx6RCgCSrx4C/K1yKIC3AD7yaCH/+V+CgPH/L8BWvYVs1V9iqPwYpYg3MpJNDwGjdqwCWihrvmbuZ4QCfnineWpd4xPAW6ayBxri8b1u/6ZJgyTuC9C3IcoS75i0aPfkWhSHeuL+0rmpZpVlCwCUDZMFSVZZGnneNVmh51AgeVe8AP7wsOMum2DhrgauxT3598HC3VMRrlnIZELeDfbkL4JmlblMJ+Q/mV/YlLnpnm4wAXp9rHNex7YpGro7qu1YxjtN/8NbqXfYXNBxDQ2dNLdRz64Hj2mqrJlm8hFvAChfZtc2E1cZw2fWGjVM9XECNox/KTaSyrEAAAAASUVORK5CYII="
                  />
                </button>
              </div>
            )}
          </div>
        <div className="p-6 border rounded-md">
          
          {formData.addresses.map((address, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md bg-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleLabelChange(index, "Home")}
                        className={`px-2 py-1 rounded-md ${
                          address.label === "Home"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        Home
                      </button>
                      <button
                        onClick={() => handleLabelChange(index, "Work")}
                        className={`px-2 py-1 rounded-md ${
                          address.label === "Work"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        Work
                      </button>
                      <button
                        onClick={() => handleLabelChange(index, "Other")}
                        className={`px-2 py-1 rounded-md ${
                          address.label === "Other"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        Other
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-md ${
                        address.label === "Home"
                          ? "bg-green-500 text-white"
                          : address.label === "Work"
                          ? "bg-blue-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {address.label}
                    </span>
                  )}
                </span>
                {isEditing && formData.addresses.length > 1 && (
                  <div className="flex">
                    <button
                      onClick={() => handleSetDefault(index)}
                      className={`px-1 mr-2 text-white rounded-md ${
                        address.isDefault ? "bg-green-500" : "bg-gray-500"
                      }`}
                    >
                      {address.isDefault ? "Default" : "Set as Default"}
                    </button>
                    <span className="flex rounded-md border hover:bg-red-200 ">
                      <button
                        onClick={() => handleRemoveAddress(index)}
                        className="px-1 text-red-500"
                      >
                        Remove
                      </button>
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-6 mt-4">
                <div className="flex gap-6">
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={address.address}
                    onChange={(e) => handleInputChange(e, index)}
                    disabled={!isEditing}
                    className="w-full p-2 border rounded-md"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => handleInputChange(e, index)}
                    disabled={!isEditing}
                    className="w-3/2 p-2 border rounded-md"
                  />
                </div>
                <div className="flex gap-6">
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => handleInputChange(e, index)}
                    disabled={!isEditing}
                    className="w-3/2 p-2 border rounded-md"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="Zip Code"
                    value={address.zip}
                    onChange={(e) => handleInputChange(e, index)}
                    disabled={!isEditing}
                    className="w-3/2 p-2 border rounded-md"
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={address.country}
                    onChange={(e) => handleInputChange(e, index)}
                    disabled={!isEditing}
                    className="w-3/2 p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <label className="text-lg font-semibold text-gray-700 ">Payment Method</label>
          
          <div id="paymentMethods" className="flex flex-col space-y-4 mt-2">
  
    {paymentMethods.map((method, index) => (
      <div
        key={index}
        className="flex items-center p-4 border rounded-md"
      >
        <img
          alt={`${method.type} logo`}
          className="mr-4"
          height="30"
          src={method.logo}
          width="50"
        />
        <div className="flex-1">
          <p>
            {method.type} .... {method.lastFour}
          </p>
          <p className="text-gray-500 text-sm">
            Cardholder: {method.holderName}
          </p>
          <p className="text-gray-500 text-sm">
            Expires: {method.expiry}
          </p>
        </div>
        <button
          className="ml-auto text-red-500"
          onClick={() => handleRemovePaymentMethod(index)}
        >
          REMOVE
        </button>
      </div>
    ))}
    {paymentMethods.length == 0 && !isEditing &&(

    <div className="p-4 border rounded-md text-center">
      <p className="text-gray-500 text-sm">No payment methods added.</p>
    </div>
    )}
 
</div>

          {isEditing && (
            <div>

                <div className="flex space-x-4 mt-2">
                {["Visa", "MasterCard"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedCardType(type)}
                    className={`p-2 border rounded-md ${
                      selectedCardType === type
                        ? "bg-green-500 text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

          <form
            onSubmit={handleAddPaymentMethod}
            className="mt-4 w-1/2 flex flex-col space-y-2"
          >
            <div className="flex gap-6">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Card Number"
                className="p-2 border rounded-md"
                required
              />
            </div>
            <div className="flex gap-6">
              <input
                type="text"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                placeholder="Cardholder Name"
                className="p-2 border rounded-md"
                required
              />
              <input
                type="date"
                maxLength={2}
                id="expiry-month"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                name="expiry-month"
                min="1"
                max="12"
                required
                className="p-2 border rounded-md"
              ></input>
              
            </div>
            <button
              type="submit"
              className="mt-2 p-2 border rounded-md text-green-500"
            >
              ADD PAYMENT METHOD
            </button>
          </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopProfile;
