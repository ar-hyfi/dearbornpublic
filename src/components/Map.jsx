import React, { useState, useEffect } from 'react';

import mapboxgl from 'mapbox-gl';
import river_bridges from '../geojsons/river_bridges.geojson';
import road_sensors from '../geojsons/road_sensors.geojson';
import { fetchData } from '../services/influxDB'
import { Button, Typography } from '@mui/material';


// Make sure to set your Mapbox token here
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpZWwtaHlmaSIsImEiOiJjbGo3ZHI2cWwwcTlzM3FxZ3RtNDFkcXpkIn0.StEAI2H39Ne4tJ3Pb1DfFA';

// class Map extends React.Component {
//   // using a class property
//   map = null;

//   componentDidMount() {
//      this.map = new mapboxgl.Map({
//       container: 'map', 
//       style: 'mapbox://styles/ariel-hyfi/clkcua2s3003l01qka0339nog', 
//       center: [-83.20130880622676, 42.31766379470411], 
//       zoom: 12, 
//       pitch: 45,
//       bearing: -17.6,
//     });

//     this.map.on('load', () => {

//       // add the data for the river bridges
//       if (!this.map.getSource('river_bridges')) {
//         this.map.addSource('river_bridges', {
//             type: 'geojson',
//             data: river_bridges,
//         });
//       }
      
//       // add the marker layer for the river bridges
//       this.map.addLayer({
//         'id': 'river_bridges_markers',
//         'type': 'circle',
//         'source': 'river_bridges',
//         'paint' : {
//             'circle-opacity': 1,
//             'circle-stroke-width': 5,
//             'circle-stroke-color': [
//                     'case',
//                         ['<', ['get', 'level'], ['get', 'alert_level (in)']], '#0E4732',
//                         ['>=', ['get', 'level'], ['get', 'alert_level (in)']], '#8B0000',
//                         // otherwise, set the text color to black
//                         'black'
//             ],
//             'circle-radius':5,
//             'circle-color': [
//                     'case',
//                         ['<', ['get', 'level'], ['get', 'alert_level (in)']], 'rgb(115, 191, 105)',
//                         ['>=', ['get', 'level'], ['get', 'alert_level (in)']], 'rgb(242, 73, 92)',
//                         // otherwise, set the text color to black
//                         'black'
//             ],
//         },
//       });    
      
//       // add the label layer for the river bridges
//       this.map.addLayer({
//           'id': 'river_bridges_labels',
//           'type':'symbol',
//           'source': 'river_bridges',
//           'layout': {
//               'text-field':['get','display_name'],
//               'text-allow-overlap': false,
//               'text-variable-anchor': ['top','bottom'],
//               'text-radial-offset': 1,
//               'text-justify': 'auto',
//               'text-font': ['Arial Unicode MS Bold'],
//               //'text-opacity': 0,
//               },
//           'paint': {
//               // change the color of the text label based on the level
//               'text-color': [
//                   'case',
//                       ['<', ['get', 'level'], ['get', 'alert_level (in)']], 'rgb(115, 191, 105)',
//                       ['>=', ['get', 'level'], ['get', 'alert_level (in)']], 'rgb(242, 73, 92)',
//                       // otherwise, set the text color to black
//                       'black'
//               ],
//           }
//       });

//       // add the data for the road sensors
//       if (!this.map.getSource('road_sensors')) {
//         this.map.addSource('road_sensors', {
//             type: 'geojson',
//             data: road_sensors,
//         });
//       }

//       // add the marker layer for the road sensors
//       this.map.addLayer({
//       'id': 'road_sensors_markers',
//       'type': 'circle',
//       'source': 'road_sensors',
//       'paint' : {
//           'circle-opacity': 1,
//           'circle-stroke-width': 5,
//           'circle-stroke-color': [
//               'case',
//               ['<', ['get', 'level'], 4], '#0E4732',
//               ['>=', ['get', 'level'], 4], '#8B0000',
//               // otherwise, set the circle outline to black
//               'black',
//           ],
//           'circle-radius':5,
//           'circle-color': [
//               'case',
//               // less than 4 inches, set the marker color to green
//               ['<', ['get', 'level'], 4], 'rgb(115, 191, 105)',
//               // in between 4 and 8 inches, set the marker color to yellow
//              // ['all', ['>=', ['feature-state', 'level'], 4], ['<=', ['get', 'level'], 8]], 'yellow',
//               // greater than 8 inches, set the marker color to red
//               ['>', ['get', 'level'], 4], 'rgb(242, 73, 92)',
//               // otherwise, set the marker color to white
//               'black',
//           ],
//       },
//       });    

//       // add the label layer for the road sensors
//       this.map.addLayer({
//           'id': 'road_sensors_labels',
//           'type': 'symbol',
//           'source': 'road_sensors',
//           'layout' : {
//               'text-field':['get','display_name'],
//               'text-allow-overlap': false,
//               'text-variable-anchor': ['top','bottom'],
//               'text-radial-offset': 1,
//               'text-justify': 'auto',
//               'text-size':16,
//               //'text-opacity': 0,
//               'text-font': ['Arial Unicode MS Bold'],

//           },
//           'paint' : {
//               // change the color of the text label based on the level
//               'text-color': [
//                   'case',
//                       ['<', ['get', 'level'], 4], 'rgb(115, 191, 105)',
//                       ['>', ['get', 'level'], 4], 'rgb(242, 73, 92)',
//                       //['all', ['>=', ['get', 'level_num'], 4], ['<=', ['get', 'level_num'], 8]], 'yellow',
//                       'rgb(242, 73, 92)'
//               ],

//               // change the halo color of the text label based on the level
//               'text-halo-color': [
//                   'case',
//                   // less than 4 inches, set the marker color to green
//                   ['<', ['feature-state', 'level'], 4], '#023020',
//                   // in between 4 and 8 inches, set the marker color to yellow
//                   //['all', ['>=', ['feature-state', 'level'], 4], ['<=', ['get', 'level'], 8]], 'yellow',
//                   // greater than 8 inches, set the marker color to red
//                   ['>=', ['feature-state', 'level'], 4], '#FF0000',
//                   // otherwise, set the marker color to white
//                   'white',
//               ],
//               'text-halo-width': 1,
//           }
//       });

//       // add the 3d buildings layer
//       var layers = this.map.getStyle().layers;
//       var labelLayerId;
//       for (var i = 0; i < layers.length; i++) {
//           if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
//               labelLayerId = layers[i].id;
//               break;
//           }
//       }

//       this.map.addLayer({
//           'id': '3d-buildings',
//           'source': 'composite',
//           'source-layer': 'building',
//           'filter': ['==', 'extrude', 'true'],
//           'type': 'fill-extrusion',
//           'minzoom': 15,
//           'paint': {
//               'fill-extrusion-color': '#aaa',
//               'fill-extrusion-height': ['get', 'height'],
//               'fill-extrusion-base': ['get', 'min_height'],
//               'fill-extrusion-opacity': .6
//           }
//       }, labelLayerId);
    
//     });
//   }

//   render() {
//     return <div id="map" style={{ width: '100%', height: '100%' }} />;
//   }
// }
// export default Map;
function Map() {
  const [map, setMap] = useState(null);
  const [darkMode, setDarkMode] = useState(true); // Use a boolean state for dark mode

  useEffect(() => {
    const mapStyle = darkMode ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v10';
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: mapStyle,
      center: [-83.20130880622676, 42.31766379470411],
      zoom: 12,
      pitch: 45,
      bearing: -17.6,
    });

    setMap(mapInstance);
    mapInstance.on('load', () => {
      mapInstance.resize();
    });
    return () => mapInstance.remove(); // Cleanup on unmount
  }, [darkMode]);

  const toggleMapMode = () => {
    const mapContainer = document.getElementById("map");
    // Fade out the map container
    mapContainer.style.transition = "opacity 0.5s";
    mapContainer.style.opacity = "0";
    
    // After the fade-out effect is complete, switch the map style
    setTimeout(() => {
      setDarkMode(prevMode => !prevMode);
      // Fade the map container back in after changing the map style
      mapContainer.style.opacity = "1";
    }, 500); // 500ms matches the transition duration
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div id="map" style={{ flex: 1, width: '100%' }} />
        <div style={{ padding: '1em' }}>
            {/* <Typography gutterBottom>Map Style</Typography>
            <Button 
                variant="contained"
                color={darkMode ? "primary" : "secondary"}
                onClick={toggleMapMode}
            >
                Toggle Map Style
            </Button> */}
        </div>
    </div>
);

}

export default Map;