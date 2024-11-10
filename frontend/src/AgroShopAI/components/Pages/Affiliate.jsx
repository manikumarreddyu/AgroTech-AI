import React, { useState } from 'react';
import AffiliateHeader from './components/AffiliateHeader';
import AffiliateJoinSection from './components/AffiliateJoinSection';
import AffiliateDashboard from './components/AffiliateDashboard';
import AffiliateMarketingMaterials from './components/AffiliateMarketingMaterials';
import AffiliateTerms from './components/AffiliateTerms';


export default function AffiliateProgramPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dateRange, setDateRange] = useState('last7days');

  const dummyData = {
    clicks: 1250,
    signUps: 75,
    conversions: 30,
    commissions: 450.0,
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-green-100 mt-20 ">
      <AffiliateHeader />
      <main className="container mx-auto px-4 py-8">
        <AffiliateJoinSection />
        <AffiliateDashboard
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
          dateRange={dateRange}
          setDateRange={setDateRange}
          dummyData={dummyData}
        />
        <AffiliateMarketingMaterials />
        <AffiliateTerms />
      </main>

    </div>
  );
}
