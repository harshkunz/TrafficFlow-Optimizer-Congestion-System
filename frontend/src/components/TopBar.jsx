import React, { useState, useEffect } from 'react';

const TopBar = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-600 text-white flex items-center justify-between px-4 py-3 shadow-md">
      <div className="text-lg font-semibold">Traffic Flow Optimizer</div>
      <div className="flex items-center space-x-4">
        <div>Last Updated: {lastUpdated.toLocaleTimeString()}</div>
        <button className="bg-blue-800 hover:bg-blue-700 px-3 py-1 rounded">Refresh</button>
        <button className="bg-blue-800 hover:bg-blue-700 px-3 py-1 rounded">Settings</button>
      </div>
    </div>
  );
};

export default TopBar;
