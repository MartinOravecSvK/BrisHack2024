import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMapData, addMapData } from '../../store/actions/actions';
import './RequestSimulation.css';

const RequestSimulation = () => {
  const [requests, setRequests] = useState([]);
  const dispatch = useDispatch();
  const mapRef = useRef(null)

  const getMapDataReducer = useSelector((state) => state.getMapData);
  // const { error: getMapDataError, loading: getMapDataLoading, data: mapData } = getMapDataReducer;
  const { error, loading, data } = getMapDataReducer;
  const [newRequests, setNewRequests] = useState('')
  
  // if(mapData.length > 0){
  //   console.log(mapData[0])
  // }

  // useEffect(() => {
  //   dispatch(getMapData());
  // }, [dispatch]);

  useEffect(() => {
    if (!loading && mapRef.current && window.google && data) {
      const emotionData = {
        happy: [],
        sad: [],
        angry: [],
        surprised: [],
      };
    }
  
    const intervalId = setInterval(() => {
      if (data) {
        const dataArray = Object.values(data);
        
        // Grab a random record from dataArray
        const randomIndex = Math.floor(Math.random() * dataArray.length);
        const randomItem = dataArray[randomIndex];
  
        // Create a newRequest from the random item
        const newRequest = {
          userLocation: randomItem.geopoint.latitude,
          emotion: randomItem.emotion.charAt(0).toUpperCase() + randomItem.emotion.slice(1),
        };
  
        setRequests((prevRequests) => [...prevRequests, newRequest]);
      }
    }, 2000);
  
    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [loading, mapRef, window.google, data]);
  

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


