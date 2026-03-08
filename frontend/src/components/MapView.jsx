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

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// function MapView({ data }) {
//   const getMarkerIcon = (detection) => {
//     // Both pothole and obstacle
//     if (detection.depth > 0 && detection.hasObstacle) return orangeIcon;
    
//     // Only obstacle
//     if (detection.hasObstacle && detection.obstacleType === 'tree') return greenIcon;
//     if (detection.hasObstacle && detection.obstacleType === 'building') return blueIcon;
    
//     // Only pothole
//     return redIcon;
//   };

//   // Center map on Sri Lanka
//   const centerPosition = [7.8731, 80.7718];

//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
//       <div className="h-[500px] w-full">
//         <MapContainer
//           center={centerPosition}
//           zoom={8}
//           style={{ height: '100%', width: '100%' }}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           {data.map((detection) => (
//             <Marker
//               key={detection.id}
//               position={[detection.lat, detection.lng]}
//               icon={getMarkerIcon(detection)}
//             >
//               <Popup>
//                 <div className="p-2">
//                   <p className="font-semibold text-sm mb-2">
//                     {detection.depth > 0 && detection.hasObstacle && '⚠️ Pothole + Obstacle'}
//                     {detection.depth > 0 && !detection.hasObstacle && '🚧 Pothole Detected'}
//                     {!detection.depth && detection.hasObstacle && detection.obstacleType === 'tree' && '🌳 Tree Detected'}
//                     {!detection.depth && detection.hasObstacle && detection.obstacleType === 'building' && '🏢 Building Detected'}
//                   </p>
                  
//                   {detection.depth > 0 && (
//                     <p className="text-xs text-rose-600 font-semibold mb-1">
//                       🕳️ Pothole Depth: {detection.depth} cm
//                     </p>
//                   )}
                  
//                   {detection.hasObstacle && (
//                     <div className="mb-1">
//                       <p className="text-xs text-blue-600 font-semibold">
//                         🚧 Obstacle Type: {detection.obstacleType}
//                       </p>
//                       <p className="text-xs text-green-600 font-semibold">
//                         📏 Distance from road: {detection.obstacleDistance} cm
//                       </p>
//                       {detection.obstacleDistance <= 120 && (
//                         <p className="text-xs text-orange-600 font-bold mt-1">
//                           ⚠️ Within detection range (≤120cm)
//                         </p>
//                       )}
//                     </div>
//                   )}
                  
//                   <p className="text-xs text-slate-500 mt-2">
//                     📍 {detection.lat.toFixed(4)}, {detection.lng.toFixed(4)}
//                   </p>
//                   <p className="text-xs text-slate-400">{detection.timestamp}</p>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </div>
//     </div>
//   );
// }
function MapView() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      <div className="px-6 py-5 bg-gradient-to-r from-slate-800 to-slate-700">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🗺️ Location Map
        </h2>
      </div>
      <div className="p-12 text-center bg-gradient-to-br from-slate-50 to-white">
        <div className="text-7xl mb-4">📍</div>
        <p className="text-xl font-semibold text-slate-700">Map Integration Coming Soon</p>
        <p className="text-sm text-slate-500 mt-3">
          Will display pothole locations on an interactive map
        </p>
      </div>
    </div>
  );
}

export default MapView;