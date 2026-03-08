import PropTypes from 'prop-types';

function StatsCard({ icon, title, value, unit }) {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-semibold uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-bold text-slate-800 mt-3">
            {value} {unit && <span className="text-xl text-slate-500">{unit}</span>}
          </p>
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