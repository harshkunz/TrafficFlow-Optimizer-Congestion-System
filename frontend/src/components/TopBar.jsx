import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black text-white flex items-center justify-between px-3 py-3 shadow-md border-1">
      <div className="text-md font-semibold">Traffic Flow Optimizer</div>
      <div className="flex items-center space-x-3 text-sm">
        <div>Last sync : {lastUpdated.toLocaleTimeString()}</div>
        <button onClick={() => (window.location.href = "/")} className="bg-black text-white border-1 px-2 py-2">Refresh</button>
      </div>
    </div>
  );
};

export default TopBar;
