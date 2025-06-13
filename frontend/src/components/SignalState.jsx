import { useEffect, useState } from 'react';
import axios from 'axios';

const SignalState = () => {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/current-signal')
      .then(res => setSignals(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="mt-5 px-4">
      <h2 className="font-bold text-lg mb-2">Signal Timings</h2>
      {signals.map(sig => (
        <div key={sig._id} className="mb-2">
          <p>Intersection: {sig.intersectionId}</p>
          <p className="text-green-600">Green: {sig.greenDuration}s</p>
          <p className="text-red-600">Red: {sig.redDuration}s</p>
        </div>
      ))}
    </div>
  );
};

export default SignalState;
