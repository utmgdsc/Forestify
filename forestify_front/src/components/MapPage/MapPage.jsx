import { useState } from 'react';
import './MapPage.css'
import { Link } from "react-router-dom";
import { GrMapLocation } from 'react-icons/gr';
import { SidebarData } from './SidebarData';
import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { OpenStreetMapProvider } from "react-leaflet-geosearch";
import MapSearch from './MapSearch';

export const MapPage = () => {
  const [sidebar, setSidebar] = useState(false);
  const [coordinates, setCoordinates] = useState({ location: '', latitude: '', longitude: '' }); // State to hold coordinates

  const showSidebar = () => setSidebar(!sidebar);
  const prov = OpenStreetMapProvider();

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
        const { lat, lon } = data[0];
        setCoordinates(prevState => ({
          ...prevState,
          latitude: lat,
          longitude: lon
        }));
      } else {
        console.log("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }
  

  return (
    <>
      <div className="navbar"> 
        <Link to="#" className='menu-bars'>
          <GrMapLocation onClick={showSidebar}/>
        </Link>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <div className="map-container-wrapper">
        <MapContainer center={[51.505, -0.091]} zoom={13}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
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

          {/* Coordinates box */}
          <div className="coordinates-box-overlay">
            <form onSubmit={handleSubmit} className="coordinates-form">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input type="text" name="location" className="form-control" id="location" placeholder="Location" value={coordinates.location} onChange={handleInputChange} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </MapContainer>
      </div>
    </>
  );
}
