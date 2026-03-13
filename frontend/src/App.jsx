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
  const [depthHistory, setDepthHistory] = useState([]);
  const [allDepthData, setAllDepthData] = useState([]);
  const [allObstacleData, setAllObstacleData] = useState([]);
  const [stats, setStats] = useState({
    totalDetections: 0,
    averageDepth: 0,
    maxDepth: 0,
    recentDetections: 0
  });

  // Function to decode timestamp from Firebase push ID
  const getTimestampFromPushId = (pushId) => {
    const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
    let timestamp = 0;
    for (let i = 0; i < 8; i++) {
      timestamp = timestamp * 64 + PUSH_CHARS.indexOf(pushId[i]);
    }
    return timestamp;
  };

  // Update combined data whenever depth or obstacle data changes
  useEffect(() => {
    const combinedData = [...allDepthData, ...allObstacleData];
    
    // Sort by timestamp (newest first)
    combinedData.sort((a, b) => b.timestampMs - a.timestampMs);
    
    setDetectionData(combinedData);

    // Calculate stats
    const depths = allDepthData.map(d => d.depth);
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
  }, [allDepthData, allObstacleData]);

  useEffect(() => {
    // Live depth listener
    const liveDepthRef = ref(database, 'live/depth');
    const liveDepthUnsubscribe = onValue(liveDepthRef, (snapshot) => {
      if (snapshot.exists()) {
        const depth = snapshot.val();
        setLiveDepth(depth);
        
        // Update depth history for graph (keep last 20 readings)
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        
        setDepthHistory(prev => {
          const newHistory = [...prev, { time: timeString, value: depth }];
          return newHistory.slice(-20); // Keep last 20 points
        });
      }
    });

    // Live obstacle listener
    const liveObstacleRef = ref(database, 'live/obstacle');
    const liveObstacleUnsubscribe = onValue(liveObstacleRef, (snapshot) => {
      if (snapshot.exists()) {
        setLiveObstacle(snapshot.val());
      }
    });

    // Pothole detections listener
    const potholeRef = ref(database, 'detections/potholes');
    const potholeUnsubscribe = onValue(potholeRef, (snapshot) => {
      const depthEntries = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const id = childSnapshot.key;
          const potholeData = childSnapshot.val();
          
          // Extract depth_cm and timestamp from the nested object
          const depth = potholeData?.depth_cm;
          const location = potholeData?.location || '-';
          const timestamp = potholeData?.timestamp;
          
          if (depth !== undefined && depth !== null) {
            // Use Firebase push ID timestamp or provided timestamp
            const timestampMs = timestamp || getTimestampFromPushId(id);
            const date = new Date(timestampMs);
            const formattedTimestamp = date.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true
            });
            
            depthEntries.push({
              id,
              depth: typeof depth === 'number' ? depth : parseFloat(depth),
              obstacle: null,
              location: location,
              type: 'depth',
              timestamp: formattedTimestamp,
              timestampMs: timestampMs, // Store for sorting
              status: depth > 20 ? 'Critical' : 'Warning'
            });
          }
        });
      }

      setAllDepthData(depthEntries);
    });

    // Obstacle detections listener
    const obstacleRef = ref(database, 'detections/obstacles');
    const obstacleUnsubscribe = onValue(obstacleRef, (snapshot) => {
      const obstacleEntries = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const id = childSnapshot.key;
          const obstacleData = childSnapshot.val();
          
          // Extract dist_cm and timestamp from the nested object
          const distance = obstacleData?.dist_cm;
          const location = obstacleData?.location || '-';
          const timestamp = obstacleData?.timestamp;
          
          if (distance !== undefined && distance !== null) {
            // Use Firebase push ID timestamp or provided timestamp
            const timestampMs = timestamp || getTimestampFromPushId(id);
            const date = new Date(timestampMs);
            const formattedTimestamp = date.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true
            });
            
            obstacleEntries.push({
              id,
              depth: null,
              obstacle: typeof distance === 'number' ? distance : parseFloat(distance),
              location: location,
              type: 'obstacle',
              timestamp: formattedTimestamp,
              timestampMs: timestampMs, // Store for sorting
              status: distance <= 2 ? 'Critical' : 'Warning'
            });
          }
        });
      }

      setAllObstacleData(obstacleEntries);
    });

    return () => {
      liveDepthUnsubscribe();
      liveObstacleUnsubscribe();
      potholeUnsubscribe();
      obstacleUnsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A1929' }}>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <StatsGrid 
          stats={stats} 
          liveDepth={liveDepth} 
          liveObstacle={liveObstacle}
          depthHistory={depthHistory}
        />
        <DataTable data={detectionData} />
      </main>
    </div>
  );
}

export default App;
