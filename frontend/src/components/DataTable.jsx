import PropTypes from 'prop-types';

function DataTable({ data }) {
  return (
    <div className="rounded-xl shadow-md overflow-hidden border-2 bg-white" style={{ borderColor: '#7AAACE' }}>
      <div className="px-6 py-5" style={{ backgroundColor: '#355872' }}>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          📊 Detection History
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead style={{ backgroundColor: '#7AAACE' }}>
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
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr 
                  key={row.id} 
                  className="hover:bg-gray-50 transition-colors"
                  style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    {row.id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span 
                      className="px-2 py-1 text-xs font-semibold rounded"
                      style={{
                        backgroundColor: row.type === 'depth' ? '#dbeafe' : '#fef3c7',
                        color: row.type === 'depth' ? '#1e40af' : '#92400e'
                      }}
                    >
                      {row.type === 'depth' ? '🕳️ Pothole' : '🚧 Obstacle'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold" style={{ color: '#355872' }}>
                    {row.depth !== null ? row.depth : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold" style={{ color: '#355872' }}>
                    {row.obstacle !== null ? row.obstacle : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    -
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {row.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className="px-3 py-1.5 text-xs font-bold rounded-full"
                      style={{
                        backgroundColor: row.status === 'Critical' ? '#fee2e2' : '#fef3c7',
                        color: row.status === 'Critical' ? '#991b1b' : '#92400e',
                        border: `1px solid ${row.status === 'Critical' ? '#fca5a5' : '#fcd34d'}`
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-16 text-center bg-white">
                  <div className="text-6xl mb-4 opacity-30">🔍</div>
                  <p className="text-lg font-semibold" style={{ color: '#355872' }}>No detections yet</p>
                  <p className="text-sm text-gray-500 mt-2">Waiting for data from Arduino...</p>
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
      type: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DataTable;