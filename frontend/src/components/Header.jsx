import { RefreshCw } from 'lucide-react';

function Header() {
  return (
    <header className="shadow-md" style={{ backgroundColor: '#355872' }}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">🚗</div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                SmartCity RoadScan
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Real-time Pothole Detection System
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold text-sm">Live</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;