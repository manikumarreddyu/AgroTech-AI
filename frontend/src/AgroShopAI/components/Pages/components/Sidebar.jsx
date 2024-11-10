import {
  ShoppingCart,
  MessageSquare,
  BarChart2,
  Settings,
  Users,
  TrendingUp,
  CornerDownLeft,
  FolderKanban
} from "lucide-react";

export const Sidebar = ({ onViewChange, activeView }) => {
  return (
    <aside className="w-64 bg-green-800 text-white p-6">
      <div className="flex items-center mb-8">
        <ShoppingCart className="h-8 w-8 mr-2" />
        <h1 className="text-2xl font-bold">AgroTech Admin</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              onClick={() => onViewChange("dashboard")}
              className={`flex items-center py-2 px-4 hover:bg-green-700 rounded ${
                activeView === "dashboard" ? "bg-green-700" : ""
              }`}
            >
              <ShoppingCart className="mr-2" /> Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => onViewChange("grievances")}
              className={`flex items-center py-2 px-4 hover:bg-green-700 rounded ${
                activeView === "grievances" ? "bg-green-700" : ""
              }`}
            >
              <MessageSquare className="mr-2" /> Grievances
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => onViewChange("analytics")}
              className={`flex items-center py-2 px-4 hover:bg-green-700 rounded ${
                activeView === "analytics" ? "bg-green-700" : ""
              }`}
            >
              <BarChart2 className="mr-2" /> Analytics
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => onViewChange("customers")}
              className={`flex items-center py-2 px-4 hover:bg-green-700 rounded ${
                activeView === "customers" ? "bg-green-700" : ""
              }`}
            >
              <Users className="mr-2" /> Customers
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => onViewChange("sales")}
              className={`flex items-center py-2 px-4 hover:bg-green-700 rounded ${
                activeView === "sales" ? "bg-green-700" : ""
              }`}
            >
              <TrendingUp className="mr-2" /> Sales
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => onViewChange("return")}
              className={`flex items-center py-2 px-4 hover:bg-green-700 rounded ${
                activeView === "return" ? "bg-green-700" : ""
              }`}
            >
              <CornerDownLeft className="mr-2" /> Return
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => onViewChange("product")}
              className={`flex items-center py-2 px-4 hover:bg-green-700 rounded ${
                activeView === "product" ? "bg-green-700" : ""
              }`}
            >
              <FolderKanban className="mr-2" /> Product Management
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => onViewChange("settings")}
              className={`flex items-center py-2 px-4 hover:bg-green-700 rounded ${
                activeView === "settings" ? "bg-green-700" : ""
              }`}
            >
              <Settings className="mr-2" /> Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
