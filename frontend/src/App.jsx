import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './config/firebase';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import DataTable from './components/DataTable';
import MapView from './components/MapView';
import './App.css';

function App() {
  const [depthData, setDepthData] = useState([]);
  const [liveDepth, setLiveDepth] = useState(0);
  const [stats, setStats] = useState({
    totalDetections: 0,
    averageDepth: 0,
    maxDepth: 0,
    recentDetections: 0
  });

  useEffect(() => {
    // Listen to LIVE depth (updates every 500ms)
    const liveDepthRef = ref(database, 'live/depth');
    const liveUnsubscribe = onValue(liveDepthRef, (snapshot) => {
      if (snapshot.exists()) {
        setLiveDepth(snapshot.val());
      }
    });

    // Listen to depth history (only potholes > 10cm)
    const depthRef = ref(database, 'detections/depth');
    const historyUnsubscribe = onValue(depthRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.entries(data).map(([id, depth]) => ({
          id,
          depth,
          timestamp: new Date().toLocaleString(),
          status: depth > 15 ? 'Critical' : 'Warning'
        }));

        // Sort by most recent (last items in array)
        formattedData.reverse();

        setDepthData(formattedData);

        // Calculate statistics
        const depths = formattedData.map(d => d.depth);
        const total = depths.length;
        const avg = total > 0 ? (depths.reduce((a, b) => a + b, 0) / total).toFixed(1) : 0;
        const max = total > 0 ? Math.max(...depths) : 0;
        
        // Count recent detections (last 10)
        const recent = formattedData.slice(0, 10).length;

        setStats({
          totalDetections: total,
          averageDepth: parseFloat(avg),
          maxDepth: max,
          recentDetections: recent
        });
      } else {
        // No data yet
        setDepthData([]);
        setStats({
          totalDetections: 0,
          averageDepth: 0,
          maxDepth: 0,
          recentDetections: 0
        });
      }
    });

    return () => {
      liveUnsubscribe();
      historyUnsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* <div className="mb-8">
          <MapView />
        </div> */}
        <StatsGrid stats={stats} liveDepth={liveDepth} />
        <DataTable data={depthData} />
      </main>
    </div>
  );
}

export default App;
