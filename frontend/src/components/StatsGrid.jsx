import { AlertTriangle, Moon } from 'lucide-react';
import PropTypes from 'prop-types';
import StatsCard from './StatsCard';

function StatsGrid({ stats, liveDepth }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatsCard 
        icon="📡" 
        title="Live Road Depth" 
        value={liveDepth} 
        unit="cm" 
      />
      <StatsCard 
        icon="⚠️" 
        title="Max Depth" 
        value={stats.maxDepth} 
        unit="cm" 
      />
      <StatsCard 
        icon="🕳️" 
        title="Total Detections" 
        value={stats.totalDetections} 
        unit="" 
      />
      {/* <StatsCard 
        icon="🔔" 
        title="Recent Detections" 
        value={stats.recentDetections} 
        unit="" 
      /> */}
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
};

export default StatsGrid;