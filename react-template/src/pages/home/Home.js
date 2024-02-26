import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMapData, addMapData } from '../../store/actions/actions';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import RequestSimulation from '../../components/requestSimulation/RequestSimulation';

import './Home.css';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Home = () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  const getMapDataReducer = useSelector((state) => state.getMapData);
  const { error, loading, data } = getMapDataReducer;

  useEffect(() => {
    dispatch(getMapData());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && mapRef.current && window.google && data) {
      const emotionData = {
        happy: [],
        sad: [],
        angry: [],
        surprised: [],
      };

      // Organize data by emotion
      Object.values(data).forEach((item) => {
        if (emotionData.hasOwnProperty(item.emotion)) {
          emotionData[item.emotion].push(
            new window.google.maps.LatLng(
              item.geopoint.latitude,
              item.geopoint.longitude
            )
          );
        }
      });

      const gradients = {
        happy: ['rgba(0, 255, 0, 0)', 'rgba(127, 255, 0, 1)'], // Lighter green for happiness
        sad: ['rgba(0, 0, 255, 0)', 'rgba(100, 149, 237, 1)'], // Cornflower blue for sadness
        angry: ['rgba(255, 0, 0, 0)', 'rgba(255, 69, 0, 1)'], // Orange-red for anger
        surprised: ['rgba(255, 255, 0, 0)', 'rgba(255, 215, 0, 1)'], // Golden yellow for surprise
      };

      // Create a HeatmapLayer for each emotion
      Object.keys(emotionData).forEach((emotion) => {
        const heatmap = new window.google.maps.visualization.HeatmapLayer({
          data: emotionData[emotion],
          map: mapRef.current.map,
          gradient: gradients[emotion],
          radius: 30,
          opacity: 0.8,
        });
      });

      return () => {}; // clean up
    }
  }, [data, loading]);

  // invisible marker to add the "functionality" of a tooltip
  useEffect(() => {
    if (!loading && mapRef.current && window.google && data) {
      Object.values(data).forEach((item) => {
        const position = new window.google.maps.LatLng(
          item.geopoint.latitude,
          item.geopoint.longitude
        );

        const marker = new window.google.maps.Marker({
          position,
          map: mapRef.current.map,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 0, // Invisible marker
          },
        });

        const infowindow = new window.google.maps.InfoWindow({
          content: item.emotion,
        });

        marker.addListener('mouseover', () =>
          infowindow.open({
            anchor: marker,
            map: mapRef.current.map,
            shouldFocus: false,
          })
        );

        marker.addListener('mouseout', () => infowindow.close());
      });
    }
  }, [data, loading]);

  if (loading) return <div className='homeScreen'>Loading...</div>;
  if (error) return <div className='homeScreen'>Error: {error}</div>;

  return (
    <div className='homeScreen'>
      {/* ------------ HERO SECTION ------------------*/}
      <div className='bg-gradient-to-br from-white via-orange-200 to-orange-500 h-screen flex flex-col items-center justify-center text-center px-4'>
        <h1 className='text-black text-[8rem] font-bold mb-4 leading-tight'>
          {"MoodMap".split('').map((char, index) => (
            <span
              key={index}
              className={`inline-block animation-fadeIn`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p className='text-black-200 font-bold text-xl mb-6'>Brishack 2024</p>
      </div>

      {/* ------------ MAP SECTION ------------------*/}
      <div className='mapComponent'>
        <div className='mapContainer'>
          <Map
            google={window.google}
            style={{ width: '100%', height: '100%' }}
            zoom={6}
            initialCenter={{ lat: 53.6781, lng: -3.436 }}
            streetViewControl={false}
            heatmapLibrary={true}
            ref={mapRef} // Set reference to access map object
          />
        </div>
        <RequestSimulation />
      </div>

      {/* ------------ ABOUT SECTION ------------------*/}
      <div className='bg-gradient-to-br from-white via-orange-200 to-orange-500 h-screen flex flex-col items-center justify-center text-center px-4'>
        <h3 className='text-black text-[8rem] font-bold mb-4 leading-tight'>
          About this project
        </h3>
        <p className='text-black-200 text-xl mb-6 about'>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
          las industrias desde el año 1500, cuando un impresor (N. del T.
          persona que se dedica a la imprenta) desconocido usó una galería de
          textos y los mezcló de tal manera que logró hacer un libro de textos
          especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como
          texto de relleno en documentos electrónicos, quedando esencialmente
          igual al original. Fue popularizado en los 60s con la creación de las
          hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más
          recientemente con software de autoedición, como por ejemplo Aldus
          PageMaker, el cual incluye versiones de Lorem Ipsum.
        </p>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: apiKey,
  libraries: ['visualization'], // Ensure this line is present
})(Home);
