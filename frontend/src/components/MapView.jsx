import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from 'leaflet';
import axios from "axios";

const vehicleIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
  iconSize: [25, 25],
});

const MapView = () => {
  const [vehicles, setVehicles] = useState([]);
  const [zones, setZones] = useState([]);
  const [showMarkers, setShowMarkers] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/traffic');
      const data = await response.json();
      setVehicles(data);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/congestion")
      .then((res) => res.json())
      .then((data) => setZones(data));
  }, []);

  const getColor = (level) => {
    if (level === "High") return "red";
    if (level === "Moderate") return "blue";
    return "green";
  };

  return (
    <div className="h-[400px] pt-20">
      <MapContainer center={[28.6139, 77.2090]} zoom={7} className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {showMarkers &&
          vehicles.map((v) => (
            <Marker
              key={v._id}
              position={[v.lat, v.lng]}
              icon={vehicleIcon}
            >
              <Popup>
                ID: {v.vehicle_id} <br />
                Speed: {v.speed} km/h
              </Popup>
            </Marker>
          ))
        }

        {zones.map((zone, i) => {
          const [lat, lng] = zone.areaId.split("_").map(Number);
          return (
            <Circle
              key={i}
              center={[lat + 0.005, lng + 0.005]} 
              radius={100}
              pathOptions={{ color: getColor(zone.congestionLevel) }}
            />
          );
        })}

        <div className="absolute top-6 right-6 z-[1000]">
          <button
            onClick={() => setShowMarkers(!showMarkers)}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
          >
            {showMarkers ? "Hide Markers" : "Show Markers"}
          </button>
        </div>

      </MapContainer>
    </div>
  );
};

export default MapView;