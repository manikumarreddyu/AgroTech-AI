// src/components/PersonalizationSettings.js
import React, { useState } from "react";

const PersonalizationSettingsComponent = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [promoNotifications, setPromoNotifications] = useState(false);
  const [favoriteCategories, setFavoriteCategories] = useState(["Agriculture", "Gardening"]);
  const [preferredDuration, setPreferredDuration] = useState("Weekly");
  const [budgetRange, setBudgetRange] = useState(100);
  const [themePreference, setThemePreference] = useState("Light");

  const handleEmailNotificationToggle = () => setEmailNotifications(!emailNotifications);
  const handlePromoNotificationToggle = () => setPromoNotifications(!promoNotifications);
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setFavoriteCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-green-700 mb-4">Personalization Settings</h3>

      {/* Email Notifications */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={handleEmailNotificationToggle}
            className="mr-2"
          />
          Receive Email Notifications
        </label>
      </div>

      {/* Promotional Notifications */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={promoNotifications}
            onChange={handlePromoNotificationToggle}
            className="mr-2"
          />
          Receive Promotional Offers Notifications
        </label>
      </div>

      {/* Favorite Categories */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-2">Favorite Categories</h4>
        {["Agriculture", "Gardening", "Landscaping", "Tools", "Machinery"].map((category) => (
          <label key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              value={category}
              checked={favoriteCategories.includes(category)}
              onChange={handleCategoryChange}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>

      {/* Preferred Rental Duration */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-2">Preferred Rental Duration</h4>
        <select
          value={preferredDuration}
          onChange={(e) => setPreferredDuration(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      {/* Budget Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-2">Rental Budget Range</h4>
        <input
          type="range"
          min="50"
          max="500"
          value={budgetRange}
          onChange={(e) => setBudgetRange(e.target.value)}
          className="w-full"
        />
        <div className="text-gray-600 mt-2">Selected Budget: ${budgetRange}</div>
      </div>

      {/* Theme Preference */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-2">Theme Preference</h4>
        <select
          value={themePreference}
          onChange={(e) => setThemePreference(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        >
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
          <option value="System Default">System Default</option>
        </select>
      </div>
    </div>
  );
};

export default PersonalizationSettingsComponent;
