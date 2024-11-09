import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { GrievanceList } from "./components/GrievanceList";
import { DashboardStats } from "./components/DashboardStats";
import { useState } from "react";
import StatisticComponent from "./components/StatisticComponent";
export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("dashboard"); // Track active view

  // Function to handle view change from Sidebar
  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <div className="flex h-fit bg-gray-100 pt-15 mt-10">
      <Sidebar onViewChange={handleViewChange} activeView={activeView} />
      <main className="flex-1 p-8">
        <Header />
        {/* Render content based on active view */}
        {activeView === "dashboard" && <DashboardStats />}
        {activeView === "grievances" && <GrievanceList />}
        {activeView === "analytics" && <StatisticComponent />}
      </main>
    </div>
  );
}
