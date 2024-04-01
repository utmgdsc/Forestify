import React, { useState, useEffect } from 'react';
import './MapPage.css';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "react-leaflet-geosearch";
import MapSearch from './MapSearch';
// import { map } from 'leaflet';

// Used to recenter the map to new coordinates
const MapRecenter= ({ lat, lng, zoomLevel }) => {
  const map = useMap();

  useEffect(() => {
    // Fly to that coordinates and set new zoom level
    map.flyTo([lat, lng], zoomLevel );
  }, [lat, lng]);
  return null;

};

export const MapPage = () => {
  //const [sidebar, setSidebar] = useState(false);
  const [coordinates, setCoordinates] = useState({ location: '', startDate: '', endDate: '', latitude: '', longitude: '', analysis: '' }); // State to hold coordinates, analysis option, and dates
  const [mapLink, setMapLink] = useState("https://earthengine.googleapis.com/v1/projects/forestify-project/maps/4b724472b02ca7bc0eac108ad62aab6c-4a4abeb009b2b548b06b44fe70786f54/tiles/{z}/{x}/{y}");
  const [lat, setLat] = useState(43.6532);
  const [lon, setLon] = useState(-79.3832);
  //const showSidebar = () => setSidebar(!sidebar);
  const prov = OpenStreetMapProvider();

  // let lat = 43.6532;
  // let lon = -79.3832;
  // let mapLink = "https://earthengine.googleapis.com/v1/projects/forestify-project/maps/4b724472b02ca7bc0eac108ad62aab6c-4a4abeb009b2b548b06b44fe70786f54/tiles/{z}/{x}/{y}"



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoordinates(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${coordinates.location}`);
      const data = await response.json();
      if (data && data.length > 0) {

        setLat(data[0]['lat']);
        setLon(data[0]['lon']);
        
        try{
        const mapResponse = await fetch(`http://127.0.0.1:8000/getMap?latitude=${lat}&longitude=${lon}&analysis=${coordinates.analysis}&startDate=${coordinates.startDate}&endDate=${coordinates.endDate}`);
        const mapLinkResponse = await mapResponse.json();
        
        setMapLink(mapLinkResponse['MapLink']);

        // console.log(`http://127.0.0.1:8000/getMap?latitude=${lat}&longitude=${lon}&analysis=${coordinates.analysis}&startDate=${coordinates.startDate}&endDate=${coordinates.endDate}`)
        console.log(mapLink);

        } catch (error) {
          console.error("Error fetching map:", error);
        }
      } else {
        console.log("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }



  return (
    <>

      <div className="map-container-wrapper">
        <MapContainer center={[lat,lon]} zoom={10}>
          <MapRecenter lat={lat} lng={lon} zoomLevel={10} />
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <TileLayer
            url={mapLink}
          />
          <MapSearch
            provider={prov}
            showMarker={true}
            showPopup={false}
            popupFormat={({ query, result }) => result.label}
            maxMarkers={3}
            retainZoomLevel={false}
            animateZoom={true}
            autoClose={false}
            searchLabel={"Enter Location"}
            keepResult={true}
          />

          {/* Coordinates, Analysis, and Date inputs */}
          <div className="coordinates-box-overlay">
            <form onSubmit={handleSubmit} className="coordinates-form">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input type="text" name="location" className="form-control" id="location" placeholder="Location" value={coordinates.location} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="analysis">Analysis</label>
                <select name="analysis" className="form-control" id="analysis" value={coordinates.analysis} onChange={handleInputChange}>
                  <option value="">Select Analysis</option>
                  <option value="NDVI">NDVI</option>
                  <option value="Mann-Kendall">Mann-Kendall</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input type="date" name="startDate" className="form-control" id="startDate" value={coordinates.startDate} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input type="date" name="endDate" className="form-control" id="endDate" value={coordinates.endDate} onChange={handleInputChange} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </MapContainer>
      </div>
    </>
  );
}
