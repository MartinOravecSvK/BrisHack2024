import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMapData, addMapData } from '../../store/actions/actions';
import './Home.css';

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

  // fetch data from firebase realtime database
  useEffect(() => {
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

      {data ? (
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
      )}
    </div>
  );
};

export default Home;
