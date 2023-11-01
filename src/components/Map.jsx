import React, { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../ThemeContext'; // Adjust the import path as needed
import mapboxgl from 'mapbox-gl';
import './Map.css'
import { fetchDataFromInfluxDB } from '../services/influxDB';
import Legend from './Legend';
import Spinner from './Spinner';

// Make sure to set your Mapbox token here
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpZWwtaHlmaSIsImEiOiJjbGo3ZHI2cWwwcTlzM3FxZ3RtNDFkcXpkIn0.StEAI2H39Ne4tJ3Pb1DfFA';

// function getBounds(features) {
//   let lats = [];
//   let lngs = [];
//   features.forEach(feature => {
//     lngs.push(feature.geometry.coordinates[0]);
//     lats.push(feature.geometry.coordinates[1]);
//   });

//   return [
//     [Math.min(...lngs), Math.min(...lats)],
//     [Math.max(...lngs), Math.max(...lats)]
//   ];
// }

const river_bridges = {
  "type": "FeatureCollection",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
  { "type": "Feature", "properties": { "site_code":"86JR8P27+QM8J", "h_bed":180, "h_sensor":185.58, "alert_level_in": 120, "display_name": "Gulley @ Rouge",  "full_name": "18.1 Gulley over River Rouge", "level":8}, "geometry": { "type": "Point", "coordinates": [ -83.28581008, 42.30191714 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8P2H+H93F", "h_bed":178.75, "h_sensor":182.67,"alert_level_in": 120,"display_name": "Telegraph @ Rouge", "full_name": "18.2 Telegraph over River Rouge", "level":8}, "geometry": { "type": "Point", "coordinates": [ -83.27158186, 42.30138972 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8P3P+HH59", "h_bed":177.5, "h_sensor":186.44,"alert_level_in": 120,"display_name": "Outer Drive @ Rouge",  "full_name": "18.3 Outer Drive over River Rouge", "level":8}, "geometry": { "type": "Point", "coordinates": [ -83.26350358, 42.30388155 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8P5W+CV95", "h_bed":176.75, "h_sensor":183.03,"alert_level_in": 120,"display_name": "Military @ Rouge", "full_name": "18.4 Military over River Rouge", "level":8}, "geometry": { "type": "Point", "coordinates": [ -83.25275459, 42.30852982 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8R22+98X8", "h_bed":174.25, "h_sensor":180.66,"alert_level_in": 120,"display_name": "Rotunda @ Rouge",  "full_name": "18.5 Rotunda over River Rouge", "level":8}, "geometry": { "type": "Point", "coordinates": [ -83.19913495, 42.30098118 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR7RVC+Q7VC", "h_bed":174, "h_sensor":180.05,"alert_level_in": 120,"display_name": "Greenfield @ Rouge", "full_name": "18.6 Greenfield over River Rouge", "level":8}, "geometry": { "type": "Point", "coordinates": [ -83.17933631, 42.29448528 ] } }
  ]
};

const road_sensors = {
  "type": "FeatureCollection",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
  { "type": "Feature", "properties": { "site_code":"86JR8R75+5472", "h_bed":176.106, "h_sensor":179.232, "alert_level_in": 4,"name": "1 Greenfield just south of Prospect","display_name":"Greenfield & Prospect", "level":0, "level_num":"", "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.19221349, 42.31290205 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8R9R+7V89", "h_bed":173.736, "h_sensor":180.69, "alert_level_in": 4,"name": "3 Wyoming & Southern", "display_name":"Wyoming & Southern","level":0, "level_num":"", "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.15778164, 42.31815584 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR7PXP+WJ38", "h_bed":182.317, "h_sensor":185.453, "alert_level_in": 4,"name": "4 Outer Drive south of Michigan Ave ", "display_name":"Outer Drive & Michigan","level":0, "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.26344977, 42.29975715 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR7PXH+R778", "h_bed":181.17, "h_sensor":188.341, "alert_level_in": 4,"name": "5 Telegraph & Michigan ", "display_name":"Telegraph & Michigan","level":0, "level_num":"", "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.27182153, 42.29953459 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8Q45+23QF", "h_bed":181.402, "h_sensor":184.528, "alert_level_in": 4,"name": "9 Oakwood north of Park","display_name":"Oakwood & Park", "level":0, "level_num":"", "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.24226994, 42.30508972 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8Q5M+VX34", "h_bed":179.445, "h_sensor":182.6, "alert_level_in": 4,"name": "11 M39 southbound ramp service drive & Michigan ","display_name":"M39 Southbound Ramp & Michigan", "level":0, "level_num":"", "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.21507639, 42.30962931 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8RFM+WHRQ", "h_bed":178.1556, "h_sensor":184.3, "alert_level_in": 4,"name": "12 Michigan & Miller", "display_name":"Michigan & Miller","level":0, "level_num":"", "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.16609711, 42.32486819 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR7QXR+4P95", "h_bed":178.246, "h_sensor":180.773, "alert_level_in": 4,"name": " 14 Rotunda just west of Southfield ", "display_name":"Rotunda & Southfield","level":0,"level_num":"",  "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.20812831, 42.29777586 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8QH8+G4P2", "h_bed":182.83, "h_sensor":186.358, "alert_level_in": 4, "name": "15 Ford & Evergreen","display_name":"Ford & Evergreen", "level":0,"level_num":"",  "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.234667, 42.32881 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8R6W+627J", "h_bed":175.176, "h_sensor":180.017, "alert_level_in": 4,"name": "17 Eagle Pass", "display_name":"Eagle Pass","level":0, "level_num":"", "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.15496174, 42.31054103 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8RF7+RJX2", "h_bed":180.01, "h_sensor":183.08, "alert_level_in": 4,"name": "21 Chase & Colson", "display_name":"Chase & Colson","level":0, "level_num":"", "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.18589932, 42.32460332 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8R4F+8WQ2", "h_bed":174.21, "h_sensor":180.115, "alert_level_in": 4,"name": "24.1 V-124, Grand Trunk\/Schaefer", "display_name":"Grand Trunk & Schaefer","level":0, "level_num":"", "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.17514948, 42.30582613 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8RMF+QFG8", "h_bed":177.414, "h_sensor":180.586, "alert_level_in": 4,"name": "24.3 V-126, Schaefer south of Hemlock", "display_name":"Schaefer and Hemlock","level":0,"level_num":"", "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.17629024, 42.33443414 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8RHJ+V24G", "h_bed":176.95, "h_sensor":180.621, "alert_level_in": 4,"name": "25.1 Oakman & Ford West", "display_name":"Oakman & Ford West","level":0, "level_num":"", "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.1699056, 42.3296398 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8RHJ+HC6P", "h_bed":176.917, "h_sensor":180.04, "alert_level_in": 4,"name": "25.2 Oakman & Ford South", "display_name":"Oakman & Ford South","level":0, "level_num":"", "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.16898354, 42.32891688 ] } },
  { "type": "Feature", "properties": { "site_code":"86JR8RHM+R975", "h_bed":177.66, "h_sensor":180.73, "alert_level_in": 4,"name": "25.3 Ford & Miller", "display_name":"Ford & Miller","level":0, "level_num":"", "last_updated":""}, "geometry": { "type": "Point", "coordinates": [ -83.16656388, 42.32952713 ] } }
  ]  
}   

function Map() {

  const [map, setMap] = useState(null);
  const [geojsonData, setGeojsonData] = useState([]);
  const [loading, setLoading] = useState(false); //  for getting data from influx
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const updateInterval = useRef(null)
  const { currentThemeStyles } = useContext(ThemeContext);
  console.log('currentThemeStyles', currentThemeStyles)

  // Now you can use currentThemeStyles in your component
  // For instance, you can access the mapStyle for Mapbox as follows:



  useEffect(() => {
    try {
        if (river_bridges.type === "FeatureCollection" && road_sensors.type === "FeatureCollection") {
            setGeojsonData({
                type: "FeatureCollection",
                features: [...river_bridges.features, ...road_sensors.features]
            });
            //console.log(geojsonData)
        } else {
            console.error("One of the GeoJSON files does not have the expected format.");
        }
    } catch (error) {
        console.error("Error processing GeoJSON data:", error);
    }
}, []);

  // Initialize the map
  useEffect(() => {  
    
    const mapStyle = currentThemeStyles.mapStyle;

  // And if you are using inline styles or need to pass the theme colors to components:
    const mapTextOutline = currentThemeStyles.mapTextOutline;
    //console.log('mapTextOutline', mapTextOutline)

    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: mapStyle,
      center: [-83.20130880622676, 42.31766379470411],
      zoom: 12.3,
      pitch: 45,
      bearing: -17.6,
    });

    setMap(mapInstance);

    mapInstance.on('load', () => {
      setIsMapLoaded(true);
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
          'circle-color': 'white',
          'circle-stroke-color': mapTextOutline,
          'circle-stroke-width': 1,
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

      mapInstance.addLayer({
        'id': 'point-labels-names',
        'type': 'symbol',
        'source': 'points',
        'layout': {
          'text-field': ['get', 'display_name'], // Assumes 'display_name' is a property in your GeoJSON
          'text-size': 16,
          'text-offset': [0, -2], // Offset text to appear below the marker
          'text-allow-overlap': false, // Important! This ensures labels don't overlap
          'text-font': ['Open Sans Bold']
        },
        'paint': {
          "text-color": "#ffffff",
          "text-halo-color": mapTextOutline,
          "text-halo-width": 1,
          
        }
      });

      mapInstance.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 5, // Set the minimum zoom level to display buildings
        paint: {
          'fill-extrusion-color': '#aaa', // Building color
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height'],
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height'],
          ],
          'fill-extrusion-opacity': 0.6,
        },
      });
    }


    });

    


    return () => mapInstance.remove(); // Cleanup on unmount
  }, [currentThemeStyles, geojsonData]);

  // Fetch data from InfluxDB and update the map
  useEffect(() => {
    if (!isMapLoaded) return;  // Don't run the rest of the code if map isn't available
    if (!geojsonData || !Array.isArray(geojsonData.features) || geojsonData.features.length === 0) return;

    setLoading(true);  // Start the spinner
    const mapTextOutline  = currentThemeStyles.mapTextOutline;
    fetchDataFromInfluxDB(geojsonData)
    
      .then(data => {
        //console.log(data)
        //console.log(geojsonData.features.map(f => f.properties.site_code));

        // Process and use the data to update the map
        //console.log(data);
        if (map) {  // Ensure that the map instance is available
          let matchExpression = ['match', ['get', 'site_code']];
          let timestampExpression = ['match', ['get', 'site_code']];

          let isAnyFloodingDetected = false;
          Object.entries(data).forEach(([site_name, site_data]) => {
              //console.log(site_data)
              const site_code = site_data.site_code;
              const latestValue = site_data.data[0].value;
              const alert_status = site_data.alert_status;
              const latestTimestamp = site_data.latestTimestamp;
              const color = alert_status ? 'rgb(242, 73, 92)' : 'rgb(115, 191, 105)';
              if (color === 'rgb(242, 73, 92)') {
                isAnyFloodingDetected = true;
            }

              // Add the site code and its color to the match expression
              matchExpression.push(site_code, color);
              timestampExpression.push(site_code, latestTimestamp);

          });

          // Add the default color at the end of the expression
          matchExpression.push('white');
          timestampExpression.push('');

          if (map) {
            if (map.getLayer('points')) {
                map.setPaintProperty('points', 'circle-color', matchExpression);
            }
        
            if (map.getLayer('point-labels')) {
             map.setPaintProperty('point-labels', 'text-halo-color', mapTextOutline);  // Setting the halo color to white
              map.setPaintProperty('point-labels', 'text-halo-width', 1);  
              map.setPaintProperty('point-labels', 'text-color', matchExpression);
              map.setLayoutProperty('point-labels', 'text-field', timestampExpression);
            }

            if (map.getLayer('point-labels-names')) {
              map.setPaintProperty('point-labels-names', 'text-halo-color', mapTextOutline);  // Setting the halo color to white
              map.setPaintProperty('point-labels-names', 'text-halo-width', 1);  
              map.setPaintProperty('point-labels-names', 'text-color', matchExpression);
            }
        }
        }

        setLoading(false);  // Stop the spinner once the data is fetched
      })
      .catch(error => {
        console.error("Error fetching data from InfluxDB:", error);
        setLoading(false);  // Stop the spinner if there's an error
      });

      updateInterval.current = setInterval(() => {
        fetchDataFromInfluxDB(geojsonData)
    
        .then(data => {
          //console.log(data)
          //console.log(geojsonData.features.map(f => f.properties.site_code));
  
          // Process and use the data to update the map
          //console.log(data);
          if (map) {  // Ensure that the map instance is available
            let matchExpression = ['match', ['get', 'site_code']];
            let timestampExpression = ['match', ['get', 'site_code']];
  
            let isAnyFloodingDetected = false;
            Object.entries(data).forEach(([site_name, site_data]) => {
                //console.log(site_data)
                const site_code = site_data.site_code;
                const latestValue = site_data.data[0].value;
                const alert_status = site_data.alert_status;
                const latestTimestamp = site_data.latestTimestamp;
                const color = alert_status ? 'rgb(242, 73, 92)' : 'rgb(115, 191, 105)';
                if (color === 'rgb(242, 73, 92)') {
                  isAnyFloodingDetected = true;
              }
  
                // Add the site code and its color to the match expression
                matchExpression.push(site_code, color);
                timestampExpression.push(site_code, latestTimestamp);
  
            });
  
            // Add the default color at the end of the expression
            matchExpression.push('white');
            timestampExpression.push('');
  
            if (map) {
              if (map.getLayer('points')) {
                  map.setPaintProperty('points', 'circle-color', matchExpression);
              }
          
              if (map.getLayer('point-labels')) {
                map.setPaintProperty('point-labels', 'text-halo-color', mapTextOutline);  // Setting the halo color to white
                map.setPaintProperty('point-labels', 'text-halo-width', 1);  
                map.setPaintProperty('point-labels', 'text-color', matchExpression);
                map.setLayoutProperty('point-labels', 'text-field', timestampExpression);
              }
  
              if (map.getLayer('point-labels-names')) {
                map.setPaintProperty('point-labels-names', 'text-halo-color', mapTextOutline);  // Setting the halo color to white
                map.setPaintProperty('point-labels-names', 'text-halo-width', 1);  
                map.setPaintProperty('point-labels-names', 'text-color', matchExpression);
              }
          }
          }
  
          setLoading(false);  // Stop the spinner once the data is fetched
        })
        .catch(error => {
          console.error("Error fetching data from InfluxDB:", error);
          setLoading(false);  // Stop the spinner if there's an error
        });
      }, 60000); // 1/2 hour

      // clean up on umount
      return () => {
        if (updateInterval.current) {
            clearInterval(updateInterval.current);
        }
    };

  }, [geojsonData, map, isMapLoaded]);


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
        <Legend />

        {/* <Container maxWidth="sm" style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
            {floodingDetected === 'detected' && (
                <Alert severity="error">Flooding detected!</Alert>
            )}

            {floodingDetected === 'none' && (
                <Alert severity="success">No flooding detected</Alert>
            )}
        </Container> */}
        {loading && (
            <Spinner />
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