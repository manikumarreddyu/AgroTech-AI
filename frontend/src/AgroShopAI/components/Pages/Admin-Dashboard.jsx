import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { GrievanceList } from "./components/GrievanceList";
import { DashboardStats } from "./components/DashboardStats";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <Header />
        <GrievanceList />
        <DashboardStats />
      </main>
    </div>
  );
}
