import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const TrafficChart = () => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/congestion")
      .then((res) => res.json())
      .then((data) => setDataPoints(data));
  }, []);

  if (!dataPoints.length) return <p>Loading traffic chart...</p>;

  const data = {
    labels: dataPoints.map(d => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [{
      label: 'Vehicle Count',
      data: dataPoints.map(d => d.vehicleCount),
      borderColor: 'rgb(64, 86, 215)',
      tension: 0.4,
    }],
  };

  return (
    <div className='mt-5 px-6'>
        <Line data={data} />
    </div>
  )
};

export default TrafficChart;
