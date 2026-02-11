import PropTypes from 'prop-types';

function StatsCard({ title, value, icon: Icon, borderColor, bgColor, iconColor }) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${borderColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-full`}>
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired,
  borderColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
};

export default StatsCard;