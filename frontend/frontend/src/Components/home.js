import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure to import Leaflet's CSS
import 'leaflet.heat'; // Import Leaflet.heat

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

    const emotionData = [
        [51.5074, -0.1278, 1], // London
        [55.9533, -3.1883, 0.8], // Edinburgh
        // Add more data points as needed
      ];
      // London coordinates
    const londonCenter = [51.5074, -0.1278];
    const numLocations = 50;
    const maxIntensity = 10; // Maximum intensity value
    const radius = 0.5; // Radius around London in degrees

      const generateLocationsAroundLondon = (numLocations, maxIntensity, center, radius) => {
        const locations = [];
        const [centerLatitude, centerLongitude] = center;
      
        for (let i = 0; i < numLocations; i++) {
          // Generate random latitude and longitude around the center of London
          const latitude = centerLatitude - radius + (Math.random() * (radius * 2));
          const longitude = centerLongitude - radius + (Math.random() * (radius * 2));
      
          // Assign higher intensity values to locations closer to the center
          const distanceFromCenter = Math.sqrt((latitude - centerLatitude) ** 2 + (longitude - centerLongitude) ** 2);
          const intensity = maxIntensity * (1 - (distanceFromCenter / radius));
      
          locations.push([latitude, longitude, 100]);
        }
        
        return locations;
      };
  
      const londonRedArea = generateLocationsAroundLondon(numLocations, maxIntensity, londonCenter, radius);
  

       
    const heatLayer = L.heatLayer(londonRedArea, { radius: 25, gradient: { 0: 'blue', 1: 'red' }}).addTo(map);


  
      // Create heatmap layer
      //const heatLayer = L.heatLayer(heatData, { radius: 25 }).addTo(map);

    return () => {
      // Cleanup function to remove the map instance when component unmounts
      map.remove();
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  return <div id="map" style={{ width: '50%', height: '1000px' }}></div>;
};

export default MapComponent;
