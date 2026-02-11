import { AlertTriangle, Moon } from 'lucide-react';
import PropTypes from 'prop-types';
import StatsCard from './StatsCard';

function StatsGrid({ data }) {
  const totalPotholes = data.filter(d => d.depth > 0).length;
  const deepPotholes = data.filter(d => d.depth > 8).length;
  const lightingAlerts = data.filter(d => d.isDark).length;

  return (
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
  );
}

StatsGrid.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      depth: PropTypes.number.isRequired,
      isDark: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default StatsGrid;