// components/Header.js
export const Header = () => {
  return (
    <header className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
      <div className="flex items-center">
        <span className="mr-4">Welcome, Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="Admin"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};
