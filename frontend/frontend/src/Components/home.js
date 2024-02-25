import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure to import Leaflet's CSS

const MapComponent = () => {
  useEffect(() => {
    // Define bounds for the UK
    const bounds = [
        [49.823809, -8.649357], // Southwest coordinates
        [60.951326, 1.721502]   // Northeast coordinates
    ];

    // Initialize the map with restricted bounds and disabled dragging
    const map = L.map('map', {
      maxBounds: bounds,
      maxBoundsViscosity: 0.8, // How rigid the bounds are followed, between 0 and 1
      zoomControl: false,      // Disable zoom control
      dragging: false,          // Disable dragging
      doubleClickZoom: false,  // Disable double click zoom
      boxZoom: false,          // Disable box zoom
      keyboard: false,         // Disable keyboard navigation
      scrollWheelZoom: false,  // Disable scroll wheel zoom
      tap: false,              // Disable tap interaction
      touchZoom: false,        // Disable touch zoom
      zoomSnap: 0              // Disable snapping of zoom levels
    }).setView([54.7023545, -3.2765753], 6); // Centered on the UK with zoom level 6

    // Add OpenStreetMap tile layer as the base map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add zoom control with restricted zoom levels
    // L.control.zoom({ position: 'topright', maxZoom: 6, minZoom: 6 }).addTo(map);

    return () => {
      // Cleanup function to remove the map instance when component unmounts
      map.remove();
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  return <div id="map" style={{ width: '50%', height: '1000px' }}></div>;
};

export default MapComponent;
