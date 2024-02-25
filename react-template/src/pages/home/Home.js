import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMapData, addMapData } from '../../store/actions/actions';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// Import Google Maps API Key from .env file
// require('dotenv').config();

// import styled from 'styled-components';

// const PageContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// `;

import './Home.css';
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;  

const Home = () => {
  const dispatch = useDispatch();
  const [emotion, setEmotion] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // access the state of the request
  const getMapDataReducer = useSelector((state) => state.getMapData);
  const { error, loading, data } = getMapDataReducer;

  const addMapDataReducer = useSelector((state) => state.addMapData);
  const { error: errorAdding, loading: addLoading, data: addMap } = addMapData;

  const loadGoogleMapsScript = () => {
    // Check if the script is already loaded
    if (!window.google) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization&callback=initMap';
        script.async = true;
        document.body.appendChild(script);
        // script.onload = () => {
        //     initMap(); // Make sure this function is defined to initialize your map
        // };
    } else {
        // initMap(); // If script is already loaded, directly call the initMap
    }
  };  

  // fetch data from firebase realtime database
  useEffect(() => {
    loadGoogleMapsScript();
    dispatch(getMapData());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const geopoint = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
    dispatch(addMapData(geopoint, emotion));
    // Optionally clear form fields here
    setEmotion('');
    setLatitude('');
    setLongitude('');
  };

  const heatmapData = [
    new window.google.maps.LatLng(37.782, -122.447),
    new window.google.maps.LatLng(37.782, -122.445),
  ];

  var ukCenter = new window.google.maps.LatLng(53.6781, -3.4360);

  const map = new window.google.maps.Map(document.getElementById('map'), {
    center: ukCenter,
    zoom: 6,
  });

  const heatmap = new window.google.maps.visualization.HeatmapLayer({
    data: data,
  });
  heatmap.setMap(map);

  if (loading) return <div className='homeScreen'>Loading...</div>;
  if (error) return <div className='homeScreen'>Error: {error}</div>;

  return (
    <div className='homeScreen'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Emotion'
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          required
        />
        <input
          type='number'
          placeholder='Latitude'
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        />
        <input
          type='number'
          placeholder='Longitude'
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />
        <button type='submit'>Add Map Data</button>
      </form>

      {/* {data ? (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              Emotion: {value.emotion}, Location: {value.geopoint.latitude},{' '}
              {value.geopoint.longitude}
            </li>
          ))}
        </ul>
      ) : (
        <div>No data available</div>
      )} */}

      <Map
        // get rid of the ability to use street view
        streetViewControl={false}
        google={window.google}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        zoom={6}
        initialCenter={{
          lat: 53.6781,
          lng: -3.4360,
        }}
      >
        <HeatmapLayer data={heatmapData} />
        
      </Map>
      {/* <script async defer src="https://maps.googleapis.com/maps/api/js?key=API_Key&libraries=visualization&callback=initMap"></script> */}

    </div>
  );
};


const HeatmapLayer = ({ data }) => {
  useEffect(() => {
    const heatmap = new window.google.maps.visualization.HeatmapLayer({
      data: data,
    });

    return () => {
      // Clean up when the component is unmounted
      heatmap.setMap(null);
    };
  }, [data]);

  return null;
};

// Get rid of the key
export default GoogleApiWrapper({
  apiKey: apiKey,
})(Home);