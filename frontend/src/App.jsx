import { useState } from 'react';
import { AlertTriangle, Moon } from 'lucide-react';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import MapView from './components/MapView';
import DataTable from './components/DataTable';
import { mockData } from './data/mockData';

function App() {
  const [data, setData] = useState(mockData);
  const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleTimeString());

  // Calculate stats
  const totalPotholes = data.filter(d => d.depth > 0).length;
  const deepPotholes = data.filter(d => d.depth > 8).length;
  const lightingAlerts = data.filter(d => d.isDark).length;

  const handleRefresh = () => {
    // In production, fetch new data from your Node.js backend
    const now = new Date().toLocaleTimeString();
    console.log('Refreshing data at:', now);
    setLastRefresh(now);
    setData([...mockData]); // For now, just reset to mock data
    
    // Show visual feedback
    alert(`Data refreshed at ${now}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <Header onRefresh={handleRefresh} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-slate-600 mb-4">Last refresh: {lastRefresh}</p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Potholes"
            value={totalPotholes}
            icon={AlertTriangle}
            borderColor="border-red-500"
            bgColor="bg-red-100"
            iconColor="text-red-600"
          />
          <StatsCard
            title="Deep Potholes (>8cm)"
            value={deepPotholes}
            icon={AlertTriangle}
            borderColor="border-orange-500"
            bgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
          <StatsCard
            title="Lighting Alerts"
            value={lightingAlerts}
            icon={Moon}
            borderColor="border-yellow-500"
            bgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
        </div>

        <MapView data={data} />
        <DataTable data={data} />
      </main>
    </div>
  );
}

export default App;
