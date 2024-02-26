import React, { useState, useEffect } from 'react';
import './RequestSimulation.css';

const RequestSimulation = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRequest = {
        userLocation: 'London',
        emotion: 'Happy',
      };

      setRequests(currentRequests => [newRequest, ...currentRequests]);
    }, 2000); // New request every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='requestContainer'>
      <div className='card bg-white divide-y divide-gray-200 shadow-lg overflow-y-auto'>
        {requests.map((item, index) => (
          <div key={index} className='request p-4 animate-slideIn'>
            <p>User from: {item.userLocation}</p>
            <p>Emotion: {item.emotion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestSimulation;


