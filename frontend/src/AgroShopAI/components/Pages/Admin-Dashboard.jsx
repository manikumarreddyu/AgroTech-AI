import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { GrievanceList } from "./components/GrievanceList";
import { DashboardStats } from "./components/DashboardStats";
import { useState } from "react";
import StatisticComponent from "./components/StatisticComponent";
import ReturnPanel from "./components/ReturnPage";
import AdminProductManagement from "./ProductManagement";
import ProfileEdit from "./components/ProfileManage";
export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("dashboard"); // Track active view

  // Function to handle view change from Sidebar
  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <div className="flex h-fit bg-gray-100 pt-15 mt-20">
      <Sidebar onViewChange={handleViewChange} activeView={activeView} />
      <main className="flex-1 p-8">
        <Header />
        {/* Render content based on active view */}
        {activeView === "dashboard" && <DashboardStats />}
        {activeView === "grievances" && <GrievanceList />}
        {activeView === "analytics" && <StatisticComponent />}
        {activeView === "return" && <ReturnPanel/>}
        {activeView === "product" && <AdminProductManagement/>}
        {activeView === "settings" && <ProfileEdit/>}
      </main>
    </div>
  );
}
