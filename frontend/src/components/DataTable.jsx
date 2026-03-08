import PropTypes from 'prop-types';

function DataTable({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      <div className="px-6 py-5 bg-gradient-to-r from-slate-800 to-slate-700">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          📊 Detection History
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                🕳️ Depth (cm)
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                🚧 Obstacle Distance
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                📍 Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                ⏰ Timestamp
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {row.id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-600">
                    {row.depth}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    -
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    -
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {row.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                      row.status === 'Critical' 
                        ? 'bg-red-100 text-red-700 border border-red-200' 
                        : 'bg-amber-100 text-amber-700 border border-amber-200'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="text-6xl mb-3">🔍</div>
                  <p className="text-xl font-semibold text-slate-700">No detections yet</p>
                  <p className="text-sm text-slate-500 mt-2">Waiting for data from Arduino...</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired,
      timestamp: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DataTable;