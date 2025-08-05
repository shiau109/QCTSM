// Home.jsx
import React, { useEffect, useState } from 'react';
import StatusDR from '../components/StatusDR'; // adjust path as needed
import TemperatureChart from '../components/TemperatureChart'

const Home = () => {
  const [drList, setDrList] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  // Fetch DR info on initial load
  useEffect(() => {
    fetch('http://localhost:8010/dr/info')
      .then((res) => res.json())
      .then((data) => setDrList(data))
      .catch((err) => console.error("Failed to load DR info:", err));
  }, []);

  // Fetch status on initial load + every 60 seconds
  useEffect(() => {
    const fetchStatus = () => {
      fetch("http://localhost:8010/dr/status")
        .then(async res => {
          const txt = await res.text();
          try {
            const data = JSON.parse(txt);
            setStatusMap(data);
          } catch (err) {
            console.error("Not JSON:", txt);
          }
        })
        .catch(err => {
          console.error("Fetch error:", err);
        });
    };

    fetchStatus(); // initial
    const interval = setInterval(fetchStatus, 60000); // every 60 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">DRs Status</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {drList.map(dr => (
          <StatusDR key={dr.name} dr={dr} status={statusMap[dr.name] || {}} />
        ))}
      </div>

      <TemperatureChart />
    </div>
  );

};

export default Home;
