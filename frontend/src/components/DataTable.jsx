import PropTypes from 'prop-types';

function DataTable({ data }) {
  return (
    <div 
      className="rounded-xl shadow-lg overflow-hidden border-2" 
      style={{ 
        backgroundColor: '#1E3A5F',
        borderColor: '#2E5A8F'
      }}
    >
      <div className="px-6 py-5" style={{ backgroundColor: '#0F2744' }}>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          📊 Detection History
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead style={{ backgroundColor: '#1E3A5F' }}>
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                🕳️ Depth (cm)
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                🚧 Obstacle (cm)
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                📍 Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                ⏰ Timestamp
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ divideColor: '#2E5A8F' }}>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr 
                  key={row.id} 
                  className="hover:bg-opacity-50 transition-colors"
                  style={{ 
                    backgroundColor: index % 2 === 0 ? '#1E3A5F' : '#2E5A8F'
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-200 font-mono">
                    {row.id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span 
                      className="px-2 py-1 text-xs font-semibold rounded"
                      style={{
                        backgroundColor: row.type === 'depth' ? '#3B82F6' : '#F59E0B',
                        color: '#FFFFFF'
                      }}
                    >
                      {row.type === 'depth' ? '🕳️ Pothole' : '🚧 Obstacle'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                    {row.depth !== null ? row.depth : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                    {row.obstacle !== null ? row.obstacle : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-200">
                    {row.location || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-200">
                    {row.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className="px-3 py-1.5 text-xs font-bold rounded-full"
                      style={{
                        backgroundColor: row.status === 'Critical' ? '#DC2626' : '#F59E0B',
                        color: '#FFFFFF'
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-16 text-center">
                  <div className="text-6xl mb-4 opacity-30">🔍</div>
                  <p className="text-lg font-semibold text-white">No detections yet</p>
                  <p className="text-sm text-blue-200 mt-2">Waiting for data from Arduino...</p>
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
      depth: PropTypes.number,
      obstacle: PropTypes.number,
      location: PropTypes.string,
      type: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      timestampMs: PropTypes.number,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DataTable;