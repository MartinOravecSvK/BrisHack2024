import React, { useEffect, useRef } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = (props) => {
  const mapRef = useRef();

  useEffect(() => {
    const map = mapRef.current.map;
    const maxZoom = 10; // Set your desired max zoom level here

    const zoomChangedListener = map.addListener('zoom_changed', () => {
      if (map.getZoom() > maxZoom) map.setZoom(maxZoom);
    });

    return () => {
      window.google.maps.event.removeListener(zoomChangedListener);
    };
  }, []);

  return (
    <div className='mapContainer'>
      <Map
        google={props.window.google}
        zoom={6}
        initialCenter={{ lat: 53.6781, lng: -3.4360 }}
        streetViewControl={false}
        ref={mapRef}
      />
    </div>
  );
}

export default MapContainer({
    apiKey: apiKey,
    libraries: ['visualization'], // Ensure this line is present
})(Home);