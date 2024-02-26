import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMapData, addMapData } from '../../store/actions/actions';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Home = () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  
  const [emotion, setEmotion] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const getMapDataReducer = useSelector((state) => state.getMapData);
  const { error, loading, data } = getMapDataReducer;

  useEffect(() => {
    dispatch(getMapData());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && mapRef.current && window.google && data) {
      const heatmapData = Object.values(data).map(item => {
        return new window.google.maps.LatLng(item.geopoint.latitude, item.geopoint.longitude);
      });
      
      const heatmap = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: mapRef.current.map,
      });

      return () => heatmap.setMap(null); 
    }
  }, [data, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const geopoint = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
    dispatch(addMapData(geopoint, emotion));
    setEmotion('');
    setLatitude('');
    setLongitude('');
  };

  if (loading) return <div className='homeScreen'>Loading...</div>;
  if (error) return <div className='homeScreen'>Error: {error}</div>;

  return (
    <div className='homeScreen'>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Emotion" value={emotion} onChange={(e) => setEmotion(e.target.value)} required />
        <input type="number" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
        <input type="number" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
        <button type="submit">Add Map Data</button>
      </form>

      <Map
        google={window.google}
        style={{ width: '100%', height: '95%' }}
        zoom={6}
        initialCenter={{ lat: 53.6781, lng: -3.4360 }}
        streetViewControl={false}
        ref={mapRef} // Set reference to access map object
      />
    </div>

  );
};

export default GoogleApiWrapper({
  apiKey: apiKey,
  libraries: ['visualization'], // Ensure this line is present
})(Home);