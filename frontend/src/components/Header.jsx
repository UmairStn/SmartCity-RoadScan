import { RefreshCw } from 'lucide-react';

function Header({ onRefresh }) {
  return (
    <header className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">🚗</div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                SmartCity RoadScan
              </h1>
              <p className="text-slate-300 text-sm mt-1">
                Real-time Pothole Detection System
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-lg">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="text-white font-semibold text-sm">Live</span>
          </div>
        </div>
      </div>
      <button
        onClick={onRefresh}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm"
      >
        <RefreshCw className="w-4 h-4" />
        Refresh
      </button>
    </header>
  );
}

export default Header;