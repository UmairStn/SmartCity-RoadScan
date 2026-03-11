import PropTypes from 'prop-types';

function StatsCard({ icon, title, value, unit }) {
  return (
    <div 
      className="rounded-xl shadow-md p-6 border-2 hover:shadow-lg transition-shadow bg-white"
      style={{ borderColor: '#7AAACE' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#355872' }}>
            {title}
          </p>
          <p className="text-4xl font-bold" style={{ color: '#355872' }}>
            {value}
            {unit && <span className="text-2xl ml-1" style={{ color: '#7AAACE' }}>{unit}</span>}
          </p>
        </div>
        <div className="text-5xl opacity-70">{icon}</div>
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