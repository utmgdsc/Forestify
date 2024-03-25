import { useState} from 'react';
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

  const showSidebar = () => setSidebar(!sidebar);
  const prov = OpenStreetMapProvider();

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
      {/* <MapContainer center={[37.9018, -122.292]} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://earthengine.googleapis.com/v1/projects/forestify-project/maps/fde8a1ba03c78a3ecf7df9402ffdd9eb-92433a957d7003edbcc80b2f7e5e7ba6/tiles/{z}/{x}/{y}">Forestify</a>'
          url="https://earthengine.googleapis.com/v1/projects/forestify-project/maps/fde8a1ba03c78a3ecf7df9402ffdd9eb-92433a957d7003edbcc80b2f7e5e7ba6/tiles/{z}/{x}/{y}"
        />
      </MapContainer> */}
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
      </MapContainer>
    </>
    
    
  )
}
