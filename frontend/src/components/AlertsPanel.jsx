import { useEffect, useState } from 'react';
import axios from 'axios';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/alert')
      .then(res => setAlerts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-2">Congestion Alerts</h2>
      {alerts.map(alert => (
        <div key={alert._id} className="text-sm border-b py-1">
          <strong>{alert.level}:</strong> {alert.message}
        </div>
      ))}
    </div>
  );
};

export default AlertsPanel;
