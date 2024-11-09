import React, { useState } from 'react';
import ProfileSection from './ProfileSection';
import AboutUsSection from './AboutUsSection';
import PolicySection from './PolicySection';

export default function SellerSettingPage({ initialSellerData }) {
  const [sellerData, setSellerData] = useState(initialSellerData);
  const [editMode, setEditMode] = useState({
    info: false,
    about: false,
    shipping: false,
    returns: false,
    support: false
  });

  const handleEdit = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = (section) => {
    // In a real application, save changes to the backend
    setEditMode((prev) => ({ ...prev, [section]: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellerData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePolicyChange = (e, policy) => {
    setSellerData((prev) => ({
      ...prev,
      policies: { ...prev.policies, [policy]: e.target.value }
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSellerData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <ProfileSection
        sellerData={sellerData}
        editMode={editMode}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
      />
      <AboutUsSection
        sellerData={sellerData}
        editMode={editMode}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleChange={handleChange}
      />
      <div className="mt-6 space-y-6">
        <PolicySection
          policy="shipping"
          sellerData={sellerData}
          editMode={editMode}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handlePolicyChange={handlePolicyChange}
        />
        <PolicySection
          policy="returns"
          sellerData={sellerData}
          editMode={editMode}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handlePolicyChange={handlePolicyChange}
        />
        <PolicySection
          policy="support"
          sellerData={sellerData}
          editMode={editMode}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handlePolicyChange={handlePolicyChange}
        />
      </div>
    </div>
  );
}
