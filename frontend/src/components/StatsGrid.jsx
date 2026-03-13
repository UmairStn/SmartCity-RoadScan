import { AlertTriangle, Moon } from 'lucide-react';
import PropTypes from 'prop-types';
import StatsCard from './StatsCard';
import DepthGraph from './DepthGraph';

function StatsGrid({ stats, liveDepth, liveObstacle, depthHistory }) {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard 
          icon="📡" 
          title="Live Road Depth" 
          value={liveDepth} 
          unit="cm" 
        />
        <StatsCard 
          icon="🚧" 
          title="Live Obstacle Distance" 
          value={liveObstacle} 
          unit="cm" 
        />
        <StatsCard 
          icon="🕳️" 
          title="Total Detections" 
          value={stats.totalDetections} 
          unit="" 
        />
      </div>
      <DepthGraph depthHistory={depthHistory} />
    </div>
  );
}

StatsGrid.propTypes = {
  stats: PropTypes.shape({
    totalDetections: PropTypes.number.isRequired,
    averageDepth: PropTypes.number.isRequired,
    maxDepth: PropTypes.number.isRequired,
    recentDetections: PropTypes.number.isRequired,
  }).isRequired,
  liveDepth: PropTypes.number.isRequired,
  liveObstacle: PropTypes.number.isRequired,
  depthHistory: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired
};

export default StatsGrid;