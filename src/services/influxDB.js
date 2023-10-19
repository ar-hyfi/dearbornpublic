// Mock function, replace with your actual API call later
import axios from 'axios';
import Papa from 'papaparse';
import { convertUTCToHoursMinutesFromNow } from '../utils/datetimeFunctions';

function createLatestQuery(geojson) {
    console.log(geojson)
    // extract all site codes from the geojson
    const siteCodes = geojson.features.map((f) => f.properties.site_code);

    // convert the site codes to a string that can be used in the Flux query
    const siteCodesQueryString = siteCodes.map(siteCode => `r.site_code == "${siteCode}"`).join(" or ");

    var query = `from(bucket: "prod")
    |> range(start: -1d)
    |> filter(fn: (r) => r._measurement == "maxbotix_depth")
    |> filter(fn: (r) => ${siteCodesQueryString})
    |> keep(columns: ["_value","site_code","site_name","_time"])
    |> sort(columns: ["_time"])
    |> last()`;
    
    return query;
}

export async function fetchDataFromInfluxDB(markerData) {
    const query = createLatestQuery(markerData);
    //console.log(query)
    const region = 'us-west-2-1';
    const organization = 'hyfi';
    const m2in = 39.3701;
    const token = "JxjGWE-KPUyzNY-b2WBYbFPy42M5-L_kPbjaD6ID5k16eyCIpfkpx0uO3avjT0DWvy31b-fd-7oZwdVuRctg9A==";
    const url =`https://${region}.aws.cloud2.influxdata.com/api/v2/query?org=${organization}&` +
         `q=${encodeURIComponent(query)}`;
  
         try {
          const response = await axios.post(url, query, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/vnd.flux',
              'Authorization': `Token ${token}`,
            },
          });
          const csvData = response.data;
      
          // Wrapping Papa.parse in a Promise
          const organizedData = await new Promise((resolve) => {
            Papa.parse(csvData, {
              header: true,
              dynamicTyping: true,
              complete: function (results) {
                const dataFromCSV = results.data;
                const organizedData = {};
          
                dataFromCSV.forEach((dataPoint) => {
                  const { site_name, _time, _value, site_code } = dataPoint;
                    // Find the corresponding marker data for this site_name
                    //console.log('markerData', markerData)
                    const marker = markerData.features.find(m => m.properties.site_code === site_code);

                    if (!marker) {
                        console.warn(`No marker found for site: ${site_name}`);
                        return;
                    }

                    const maxbotix_depth = _value;  // Assuming _value corresponds to maxbotix_depth. Adjust if not.
                    var level = (marker.properties.h_sensor - (maxbotix_depth / 1000.0) - marker.properties.h_bed) * m2in;
                    if(level < 0) {
                        level = 0.01;
                    }

                    // If site_name is defined, add the data to organizedData
                    if (site_name) {
                        if (!organizedData[site_name]) {
                            organizedData[site_name] = { site_code, data: [] };
                        }
                        // Store level instead of raw value
                        organizedData[site_name].data.push({ timestamp: _time, value: level });
                        if (!organizedData[site_name].latestTimestamp || organizedData[site_name].latestTimestamp < _time) {
                            organizedData[site_name].latestTimestamp = convertUTCToHoursMinutesFromNow(_time);
                         }
                    }
                });
                
                resolve(organizedData); // Resolving the Promise with organizedData
              },
            });
          });
      
          return organizedData;
      
        } catch (error) {
          console.error('Error fetching data from InfluxDB:', error);
          throw error;
        }
      }