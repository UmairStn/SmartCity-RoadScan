import { useState } from 'react';
import { AlertTriangle, TreeDeciduous } from 'lucide-react';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import MapView from './components/MapView';
import DataTable from './components/DataTable';
import { mockData } from './data/mockData';

function App() {
  const [data, setData] = useState(mockData);
  const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleTimeString());

  const totalPotholes = data.filter(d => d.depth > 0).length;
  const deepPotholes = data.filter(d => d.depth > 8).length;
  const roadsideObstacles = data.filter(d => d.hasObstacle).length;

  const handleRefresh = () => {
    const now = new Date().toLocaleTimeString();
    console.log('Refreshing data at:', now);
    setLastRefresh(now);
    setData([...mockData]);
    alert(`✅ Data refreshed at ${now}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100">
      <Header onRefresh={handleRefresh} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
            <p className="text-gray-600 text-sm mt-1">
              Last updated: <span className="font-semibold text-indigo-600">{lastRefresh}</span>
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Potholes"
            value={totalPotholes}
            icon={AlertTriangle}
            borderColor="border-rose-500"
            bgColor="bg-rose-50"
            iconColor="text-rose-600"
          />
          <StatsCard
            title="Deep Potholes (>8cm)"
            value={deepPotholes}
            icon={AlertTriangle}
            borderColor="border-orange-500"
            bgColor="bg-orange-50"
            iconColor="text-orange-600"
          />
          <StatsCard
            title="Roadside Obstacles"
            value={roadsideObstacles}
            icon={TreeDeciduous}
            borderColor="border-green-500"
            bgColor="bg-green-50"
            iconColor="text-green-600"
          />
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🗺️ Location Map</h3>
          <MapView data={data} />
        </div>

        <DataTable data={data} />
      </main>
    </div>
  );
}

export default App;
