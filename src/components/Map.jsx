import React, { useState, useEffect } from 'react';

import mapboxgl from 'mapbox-gl';
import river_bridges from '../geojsons/river_bridges.geojson';
import road_sensors from '../geojsons/road_sensors.geojson';
import { fetchData } from '../services/influxDB'
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import './Map.css'
import { fetchDataFromInfluxDB } from '../services/influxDB';
import riverBridges from '../geojsons/river_bridges.geojson';
import roadSensors from '../geojsons/road_sensors.geojson';

// Make sure to set your Mapbox token here
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpZWwtaHlmaSIsImEiOiJjbGo3ZHI2cWwwcTlzM3FxZ3RtNDFkcXpkIn0.StEAI2H39Ne4tJ3Pb1DfFA';

function getBounds(features) {
  let lats = [];
  let lngs = [];
  features.forEach(feature => {
    lngs.push(feature.geometry.coordinates[0]);
    lats.push(feature.geometry.coordinates[1]);
  });

  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)]
  ];
}
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
  const [darkMode, setDarkMode] = useState(true); // in case we want to be able to switch between dark and light mode later
  const [geojsonData, setGeojsonData] = useState([]);
  const [loading, setLoading] = useState(false);



  // const river_bridges = '/static/media/river_bridges.073ce61ee13e34f202dd.geojson' 
  // const road_sensors = '/static/media/road_sensors.1f5c7a1e3f754e92f2dd.geojson'

  useEffect(() => {
    async function fetchGeoJsonData() {
      try {
        const response1 = await axios.get(river_bridges);
        const response2 = await axios.get(road_sensors);

        if (response1.data.type === "FeatureCollection" && response2.data.type === "FeatureCollection") {
          setGeojsonData({
            type: "FeatureCollection",
            features: [...response1.data.features, ...response2.data.features]
          });
        } else {
          console.error("One of the GeoJSON files does not have the expected format.");
        }
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    }
    fetchGeoJsonData();
  }, []);

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
      
    // Check if GeoJSON data is available
    if (mapInstance && geojsonData && geojsonData.features.length > 0) {

      mapInstance.addSource('points', {
        'type': 'geojson',
        'data': geojsonData, // Your GeoJSON data
      });
      
      mapInstance.addLayer({
        'id': 'points',
        'type': 'circle',
        'source': 'points',
        'paint': {
          'circle-radius': 8,
          'circle-color': 'white'
        },
        'filter': ['==', '$type', 'Point'],
      });
      
      mapInstance.addLayer({
        'id': 'point-labels',
        'type': 'symbol',
        'source': 'points',
        'layout': {
          'text-field': ['get', 'display_name'], // Assumes 'display_name' is a property in your GeoJSON
          'text-size': 16,
          'text-offset': [0, 1.5], // Offset text to appear below the marker
          'text-allow-overlap': false // Important! This ensures labels don't overlap
        },
        'paint': {
          "text-color": "#ffffff"
        }
      });

    // const bounds = getBounds(geojsonData.features);
    // if (mapInstance) {
    //   mapInstance.fitBounds(bounds, { padding: 30 });
    //}
    }


    });

    


    return () => mapInstance.remove(); // Cleanup on unmount
  }, [darkMode, geojsonData]);

  // Fetch data from InfluxDB and update the map
  useEffect(() => {
    if (!map) return;  // Don't run the rest of the code if map isn't available
    if (!geojsonData || !Array.isArray(geojsonData.features) || geojsonData.features.length === 0) return;

    setLoading(true);  // Start the spinner
  
    //const siteCodes = geojsonData.features.map(f => f.properties.siteCode);
    
    fetchDataFromInfluxDB(geojsonData)
      .then(data => {
        // Process and use the data to update the map
        //console.log(data);
        if (map) {  // Ensure that the map instance is available

          Object.entries(data).forEach(([site_name, site_data]) => {

            const site_code = site_data.site_code;
            console.log(data)
            const latestValue = site_data.data[0].value;  // Assuming data is an array and the latest value is the first item
            const latestTimestamp = site_data.latestTimestamp;  // Assuming data is an array and the latest value is the first item
            //console.log(typeof(latestValue))
            //console.log(latestValue)
            if (!site_code) {
              console.warn(`Site code is undefined for site: ${site_name}. Skipping update for this site.`);
              return;  // Skip this iteration and proceed to the next site
          }
            // Determine the color based on the latest value
            const color = latestValue > 4 ? 'red' : 'green';

            // Update the color of the site on the map
            //console.log('is map', map)
            map.setFilter('points', ['==', ['get', 'site_code'], site_code]);  // Filter for this specific site
            map.setPaintProperty('points', 'circle-color', color);
            // map.setFilter('point-labels', ['==', ['get', 'site_code'], site_code]);  // Filter for this specific site
            // map.setPaintProperty('point-labels', 'text-color', color);
          });
          
          // Remove filter to show all points again
          map.setFilter('points', null);
        }



        setLoading(false);  // Stop the spinner once the data is fetched
      })
      .catch(error => {
        console.error("Error fetching data from InfluxDB:", error);
        setLoading(false);  // Stop the spinner if there's an error
      });
      
  }, [geojsonData, map]);
  // implementation of toggle to switch between dark and light mode
  // const toggleMapMode = () => {
  //   const mapContainer = document.getElementById("map");
  //   // Fade out the map container
  //   mapContainer.style.transition = "opacity 0.5s";
  //   mapContainer.style.opacity = "0";
    
  //   // After the fade-out effect is complete, switch the map style
  //   setTimeout(() => {
  //     setDarkMode(prevMode => !prevMode);
  //     // Fade the map container back in after changing the map style
  //     mapContainer.style.opacity = "1";
  //   }, 500); // 500ms matches the transition duration
  // };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div id="map" style={{ flex: 1, width: '100%' }}>
        {loading && (
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <div className="spinner"></div>
              <p>Data Loading...</p>
            </div>
          )}
        </div>
    </div>
        /* <div style={{ padding: '1em' }}>
            <Typography gutterBottom>Map Style</Typography>
            <Button 
                variant="contained"
                color={darkMode ? "primary" : "secondary"}
                onClick={toggleMapMode}
            >
                Toggle Map Style
            </Button>
        </div> */
);

}

export default Map;