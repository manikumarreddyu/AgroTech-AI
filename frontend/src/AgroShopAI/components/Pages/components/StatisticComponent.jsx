import React, { useState, useEffect } from 'react';
import TimeRangeSelector from './TimeRangeSelector';
import StatCard from './StatCard';
import SalesTrend from './SalesTrend';
import UserRegistrations from './UserRegistrations';
import PopularProducts from './PopularProducts';
import Analysis from './Analysis';

// Dummy data
const dummyData = {
  daily: {
    totalUsers: 1000,
    activeSellers: 150,
    totalSales: 5000,
    pendingOrders: 20,
    totalProducts: 500,
    salesTrend: [100, 120, 80, 140, 90, 160, 130],
    popularProducts: [
      { name: 'Pesticides', sales: 50 },
      { name: 'Tomato Seeds', sales: 30 },
      { name: 'Equipment', sales: 20 },
    ],
    userRegistrations: [10, 15, 8, 12, 20, 18, 14],
  },
  weekly: {
    totalUsers: 5000,
    activeSellers: 600,
    totalSales: 25000,
    pendingOrders: 100,
    totalProducts: 2000,
    salesTrend: [700, 900, 800, 1000, 1200, 950, 1100],
    popularProducts: [
      { name: 'Tomato Seeds', sales: 200 },
      { name: 'Fertilizer', sales: 150 },
      { name: 'Pesticides', sales: 100 },
    ],
    userRegistrations: [50, 70, 60, 80, 90, 75, 85],
  },
  monthly: {
    totalUsers: 20000,
    activeSellers: 2500,
    totalSales: 100000,
    pendingOrders: 500,
    totalProducts: 8000,
    salesTrend: [3000, 3500, 4000, 3800, 4200, 4500, 4300],
    popularProducts: [
      { name: 'Fertilizer', sales: 800 },
      { name: 'Insecticide', sales: 600 },
      { name: 'Equipment', sales: 500 },
    ],
    userRegistrations: [200, 250, 300, 280, 320, 350, 330],
  },
};

export default function StatisticComponent() {
  const [timeRange, setTimeRange] = useState('daily');
  const [data, setData] = useState(dummyData.daily);

  useEffect(() => {
    setData(dummyData[timeRange]);
  }, [timeRange]);

  const analyzeData = () => {
    const totalSalesChange = data.salesTrend[data.salesTrend.length - 1] - data.salesTrend[0];
    const userRegistrationChange = data.userRegistrations[data.userRegistrations.length - 1] - data.userRegistrations[0];

    return {
      salesTrend: totalSalesChange > 0 ? 'increasing' : 'decreasing',
      userRegistrationTrend: userRegistrationChange > 0 ? 'increasing' : 'decreasing',
      topProduct: data.popularProducts[0].name,
    };
  };

  const analysis = analyzeData();
  const maxSales = Math.max(...data.salesTrend);
  const maxRegistrations = Math.max(...data.userRegistrations);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard Statistics</h2>
      
      <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Total Users" value={data.totalUsers} color="bg-blue-100" />
        <StatCard title="Active Sellers" value={data.activeSellers} color="bg-green-100" />
        <StatCard title="Total Sales" value={`$${data.totalSales}`} color="bg-yellow-100" />
        <StatCard title="Pending Orders" value={data.pendingOrders} color="bg-red-100" />
        <StatCard title="Total Products" value={data.totalProducts} color="bg-purple-100" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SalesTrend data={data.salesTrend} maxSales={maxSales} />
        <UserRegistrations data={data.userRegistrations} maxRegistrations={maxRegistrations} />
      </div>

      <PopularProducts data={data.popularProducts} />

      <Analysis analysis={analysis} />
    </div>
  );
}
