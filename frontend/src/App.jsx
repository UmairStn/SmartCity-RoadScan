import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './config/firebase';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import DataTable from './components/DataTable';
import MapView from './components/MapView';
import './App.css';

function App() {
  const [detectionData, setDetectionData] = useState([]);
  const [liveDepth, setLiveDepth] = useState(0);
  const [liveObstacle, setLiveObstacle] = useState(0);
  const [stats, setStats] = useState({
    totalDetections: 0,
    averageDepth: 0,
    maxDepth: 0,
    recentDetections: 0
  });

  useEffect(() => {
    // Live depth listener
    const liveDepthRef = ref(database, 'live/depth');
    const liveDepthUnsubscribe = onValue(liveDepthRef, (snapshot) => {
      if (snapshot.exists()) {
        setLiveDepth(snapshot.val());
      }
    });

    // Live obstacle listener
    const liveObstacleRef = ref(database, 'live/obstacle');
    const liveObstacleUnsubscribe = onValue(liveObstacleRef, (snapshot) => {
      if (snapshot.exists()) {
        setLiveObstacle(snapshot.val());
      }
    });

    // Combined detection listener - listens to both depth and obstacle
    const detectionsRef = ref(database, 'detections');
    const detectionsUnsubscribe = onValue(detectionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const depthData = data.depth || {};
        const obstacleData = data.obstacle || {};

        // Convert depth detections to array
        const depthEntries = Object.entries(depthData).map(([id, depth]) => ({
          id,
          depth,
          obstacle: null,
          type: 'depth',
          timestamp: new Date().toLocaleString(),
          status: depth > 20 ? 'Critical' : 'Warning'
        }));

        // Convert obstacle detections to array
        const obstacleEntries = Object.entries(obstacleData).map(([id, distance]) => ({
          id,
          depth: null,
          obstacle: distance,
          type: 'obstacle',
          timestamp: new Date().toLocaleString(),
          status: distance >= 2 ? 'Critical' : 'Warning'
        }));

        // Combine both arrays and sort by timestamp (newest first)
        const combinedData = [...depthEntries, ...obstacleEntries];
        combinedData.reverse();
        
        setDetectionData(combinedData);

        // Calculate stats based on depth detections only
        const depths = depthEntries.map(d => d.depth);
        const total = combinedData.length;
        const avg = depths.length > 0 ? (depths.reduce((a, b) => a + b, 0) / depths.length).toFixed(1) : 0;
        const max = depths.length > 0 ? Math.max(...depths) : 0;
        const recent = combinedData.slice(0, 10).length;

        setStats({
          totalDetections: total,
          averageDepth: parseFloat(avg),
          maxDepth: max,
          recentDetections: recent
        });
      } else {
        setDetectionData([]);
        setStats({
          totalDetections: 0,
          averageDepth: 0,
          maxDepth: 0,
          recentDetections: 0
        });
      }
    });

    return () => {
      liveDepthUnsubscribe();
      liveObstacleUnsubscribe();
      detectionsUnsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <StatsGrid stats={stats} liveDepth={liveDepth} liveObstacle={liveObstacle} />
        <DataTable data={detectionData} />
      </main>
    </div>
  );
}

export default App;
