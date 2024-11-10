const TabNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-4">
      <nav className="flex border-b border-green-500">
        {[
          "personal",
          "password",
          "notifications",
          "security",
          "activity",
          "sessions",
        ].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 ${
              activeTab === tab
                ? "border-b-2 border-green-500 text-green-700"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNav;
