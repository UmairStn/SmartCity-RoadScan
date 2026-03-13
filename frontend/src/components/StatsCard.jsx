import PropTypes from 'prop-types';

function StatsCard({ icon, title, value, unit }) {
  return (
    <div 
      className="rounded-xl shadow-lg p-6 border-2 transition-transform hover:scale-105"
      style={{ 
        backgroundColor: '#1E3A5F',
        borderColor: '#2E5A8F'
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-blue-200 text-sm font-medium mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">
              {value}
            </span>
            {unit && (
              <span className="text-xl font-semibold text-blue-300">
                {unit}
              </span>
            )}
          </div>
        </div>
        <div className="text-5xl opacity-80">{icon}</div>
      </div>
    </div>
  );
}

StatsCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string,
};

export default StatsCard;