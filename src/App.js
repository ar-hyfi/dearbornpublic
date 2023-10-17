import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';

// Set your Mapbox token here
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpZWwtaHlmaSIsImEiOiJjbGo3ZHI2cWwwcTlzM3FxZ3RtNDFkcXpkIn0.StEAI2H39Ne4tJ3Pb1DfFA';

const App = () => {
  const mapContainer = useRef(null);
  let map;

  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.1276474, 51.507222], // center on London
      zoom: 10
    });

    // Clean up on unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="map-container" ref={mapContainer} />
  );
}

export default App;