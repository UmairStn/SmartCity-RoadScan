import { RefreshCw } from 'lucide-react';

function Header() {
  return (
    <header className="shadow-lg" style={{ backgroundColor: '#1E3A5F' }}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🛣️</div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                SmartCity RoadScan
              </h1>
              <p className="text-blue-200 text-sm mt-1">
                Real-time Road Monitoring System
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-blue-200 text-sm">System Status</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-semibold">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;