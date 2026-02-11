import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapView({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="h-125 w-full">
        <MapContainer
          center={[6.9271, 79.8612]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.map((detection) => (
            <Marker
              key={detection.id}
              position={[detection.lat, detection.lng]}
              icon={detection.isDark ? yellowIcon : redIcon}
            >
              <Popup>
                <div className="p-2">
                  <p className="font-semibold text-sm">
                    {detection.isDark ? '🌙 Lighting Alert' : '🚧 Pothole Detected'}
                  </p>
                  {!detection.isDark && (
                    <p className="text-xs text-slate-600">Depth: {detection.depth}cm</p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">
                    {detection.lat.toFixed(4)}, {detection.lng.toFixed(4)}
                  </p>
                  <p className="text-xs text-slate-400">{detection.timestamp}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

MapView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      depth: PropTypes.number.isRequired,
      isDark: PropTypes.bool.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MapView;