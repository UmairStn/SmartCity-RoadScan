import PropTypes from 'prop-types';

function DataTable({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800">Recent Detections</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Depth (cm)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Coordinates
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {data.map((detection) => (
              <tr key={detection.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  {detection.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {/* detect lightning */}
                  {detection.isDark ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Lighting Alert
                    </span>
                  ):("")}

                  {/* detect depth and show depth details */}
                  {detection.depth > 2 ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 ml-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Pothole
                    </span>
                  ):("")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  {detection.isDark ? 'N/A' : `${detection.depth} cm`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
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