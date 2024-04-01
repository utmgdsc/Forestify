import { useState } from 'react';
import './MapPage.css'
import { Link } from "react-router-dom";
import { GrMapLocation } from 'react-icons/gr';
import { SidebarData } from './SidebarData';
import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { OpenStreetMapProvider } from "react-leaflet-geosearch";
import MapSearch from './MapSearch';
import { useEffect } from 'react';

export const MapPage = () => {
  // const [sidebar, setSidebar] = useState(false);
  const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' }); // State to hold coordinates

  // const showSidebar = () => setSidebar(!sidebar);
  const prov = OpenStreetMapProvider();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoordinates(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted coordinates:", coordinates);

  }


  return (
    <>
      {/* <div className="navbar"> 
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
      </div> */}

      <div className="map-container-wrapper">
        <MapContainer center={[30.033333, 31.233334]} zoom={13}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <TileLayer
          url="https://earthengine.googleapis.com/v1/projects/forestify-project/maps/4b724472b02ca7bc0eac108ad62aab6c-4a4abeb009b2b548b06b44fe70786f54/tiles/{z}/{x}/{y}"
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

          
          <div className="coordinates-box-overlay">
            <form onSubmit={handleSubmit} className="coordinates-form">
              <div className="form-group">
                <label htmlFor="latitude">Latitude</label>
                <input type="text" name="latitude" className="form-control" id="latitude" placeholder="Latitude" value={coordinates.latitude} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="longitude">Longitude</label>
                <input type="text" name="longitude" className="form-control" id="longitude" placeholder="Longitude" value={coordinates.longitude} onChange={handleInputChange} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>

        </MapContainer>
      </div>

    </>
  );
}
