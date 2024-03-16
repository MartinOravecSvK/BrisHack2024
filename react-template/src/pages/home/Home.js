import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMapData } from '../../store/actions/actions';
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
        happy: ['rgba(0, 0, 255, 0)', 'rgba(100, 149, 237, 1)'], // Lighter green for happiness
        sad: ['rgba(0, 255, 0, 0)', 'rgba(127, 255, 0, 1)'], // Cornflower blue for sadness
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
        
        // const infowindow = new window.google.maps.InfoWindow({
        //   content: item.emotion,
        // });


        const emotion = item.emotion
        const capitalizedEmotion = emotion.charAt(0).toUpperCase() + emotion.slice(1);

        const contentString = `
          <div style="font-family: Arial, sans-serif; text-align: center;">
            <style>
              h3 {
                font-weight: bold;
              }
            </style>
            <h3>Emotion:</h3>
            <p>${capitalizedEmotion}</p>
          </div>
        `;

        const infowindowContainer = document.createElement("div");
        infowindowContainer.innerHTML = contentString;

        const infowindow = new window.google.maps.InfoWindow({
          content: infowindowContainer,
        });

        // const infowindow = new window.google.maps.InfoWindow({conntent: })

        // infowindow.setContent(contentString)

        marker.addListener('mouseover', () =>
          infowindow.open({
            anchor: marker,
            map: mapRef.current.map,
            shouldFocus: false,
          })
        );

        marker.addListener('mouseout', () => infowindow.close());

        window.google.maps.event.addListener(infowindow, "domready", () => {
          const closeButton = infowindowContainer.querySelector(".gm-ui-hover-effect");
          if (closeButton) {
            closeButton.style.display = "hidden";
          }
          
        });
      });
    }
  }, [data, loading]);

  if (loading) return <div className='homeScreen'>Loading...</div>;
  if (error) return <div className='homeScreen'>Error: {error}</div>;

  return (
    <div className='homeScreen'>
      {/* ------------ HERO SECTION ------------------*/}
      <div className='bg-gradient-to-br from-white via-orange-200 to-orange-500 h-screen flex flex-col items-center justify-center text-center px-4'>
        <h1 className='text-black text-[8rem] mb-4 leading-tight'>
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
        <p className='text-black-200 font-bold text-xl mb-6'>Mapping smiles across the world</p>
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
          About
        </h3>
        <p className='text-black-200 text-base mb-6 about'>
          MoodMap is our entry for the Brishack 2024 hackathon – an innovative web application which seamlessly integrates facial recognition algorithms
          to interpret and map people's emotions, through which we can understand the collective mood of a nation.  Imagine it like a big map showing how everyone's 
          feeling! Joining is super easy – just turn on your camera, and we'll add your expression to the map. It's a fun way to see the overall mood of our nation in 
          real-time!
          Our tech stack is robust, combining the versatility of Python for the backend, React for a sleek and interactive frontend, Firebase for seamless data handling,
          TensorFlow for facial emotion recognition, and Tailwind for a polished user interface.  The synergy of these technologies ensures a smooth and engaging user experience.
          At its core, MoodMap is about fostering connection through shared emotional experiences, creating a sense of belonging that transcends geographical boundaries.
          By offering valuable insights into the collective mood of communities, MoodMap has the potential to help governments allocate resources where they're needed most,
          serving as a tool for early intervention.
        </p>

        {/* GitHub Icon */}
        <a
        href='https://github.com/MartinOravecSvK/BrisHack2024'
        target='_blank'
        rel='noopener noreferrer'
        className='mt-8 flex items-center text-gray-800 dark:text-white hover:underline hover:opacity-70 transition-opacity duration-300 ease-in-out'
        >
          <svg class="w-20 h-20 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg " fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 2c-2.4 0-4.7.9-6.5 2.4a10.5 10.5 0 0 0-2 13.1A10 10 0 0 0 8.7 22c.5 0 .7-.2.7-.5v-2c-2.8.7-3.4-1.1-3.4-1.1-.1-.6-.5-1.2-1-1.5-1-.7 0-.7 0-.7a2 2 0 0 1 1.5 1.1 2.2 2.2 0 0 0 1.3 1 2 2 0 0 0 1.6-.1c0-.6.3-1 .7-1.4-2.2-.3-4.6-1.2-4.6-5 0-1.1.4-2 1-2.8a4 4 0 0 1 .2-2.7s.8-.3 2.7 1c1.6-.5 3.4-.5 5 0 2-1.3 2.8-1 2.8-1 .3.8.4 1.8 0 2.7a4 4 0 0 1 1 2.7c0 4-2.3 4.8-4.5 5a2.5 2.5 0 0 1 .7 2v2.8c0 .3.2.6.7.5a10 10 0 0 0 5.4-4.4 10.5 10.5 0 0 0-2.1-13.2A9.8 9.8 0 0 0 12 2Z" clip-rule="evenodd"/>
          </svg>

        </a>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: apiKey,
  libraries: ['visualization'], // Ensure this line is present
})(Home);
