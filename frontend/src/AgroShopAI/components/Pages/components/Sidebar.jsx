// components/Sidebar.js
import {
  ShoppingCart,
  MessageSquare,
  BarChart2,
  Settings,
  Users,
  TrendingUp,
} from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-green-800 text-white p-6">
      <div className="flex items-center mb-8">
        <ShoppingCart className="h-8 w-8 mr-2" />
        <h1 className="text-2xl font-bold">AgriMarket Admin</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center py-2 px-4 hover:bg-green-700 rounded"
            >
              <ShoppingCart className="mr-2" /> Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center py-2 px-4 bg-green-700 rounded"
            >
              <MessageSquare className="mr-2" /> Grievances
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center py-2 px-4 hover:bg-green-700 rounded"
            >
              <BarChart2 className="mr-2" /> Analytics
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center py-2 px-4 hover:bg-green-700 rounded"
            >
              <Users className="mr-2" /> Customers
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center py-2 px-4 hover:bg-green-700 rounded"
            >
              <TrendingUp className="mr-2" /> Sales
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center py-2 px-4 hover:bg-green-700 rounded"
            >
              <Settings className="mr-2" /> Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
