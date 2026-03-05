import PropTypes from 'prop-types';

function DataTable({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-indigo-500">
        <h2 className="text-2xl font-bold text-gray-800">📊 Recent Detections</h2>
        <p className="text-sm text-gray-600 mt-1">Latest sensor readings from the field</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                ⏰ Timestamp
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                🏷️ Detection Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                📏 Pothole Depth
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                🚧 Obstacle Distance
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                📍 Location
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((detection, index) => (
              <tr 
                key={detection.id} 
                className={`hover:bg-indigo-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {detection.timestamp}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 flex-wrap">
                    {detection.depth > 0 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-rose-100 text-rose-800 border border-rose-300">
                        🕳️ Pothole
                      </span>
                    )}
                    {detection.hasObstacle && detection.obstacleType === 'tree' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-300">
                        🌳 Tree
                      </span>
                    )}
                    {detection.hasObstacle && detection.obstacleType === 'building' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-300">
                        🏢 Building
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {detection.depth > 0 ? (
                    <span className="text-rose-600">{detection.depth} cm</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {detection.hasObstacle ? (
                    <span className={detection.obstacleDistance <= 120 ? 'text-orange-600' : 'text-blue-600'}>
                      {detection.obstacleDistance} cm
                      {detection.obstacleDistance <= 120 && ' ⚠️'}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                  {detection.lat.toFixed(4)}, {detection.lng.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;