import React from 'react';
import './AboutPage.css';
import appLogo from '../Assets/logo.png';
import azfar from '../Assets/azfarpfp.png';
import asad from '../Assets/asadpfp.png';
import jun from '../Assets/junpfp.png';
import arhum from '../Assets/arhumpfp.png';

// Card component
const Card = ({ imageUrl, title, text }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={imageUrl} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="page">
      <div className="header">
        <div className="logo">
          <img src={appLogo} alt="Logo" className="logoImg" />
        </div>
        <h1 className="text">About Us</h1>
        <div className="underline"></div>
      </div>
      <div className="content">
        <div className="section-container">
          <p>Welcome to Forestify, where our mission is to revolutionize environmental monitoring and conservation efforts through satellite imagery and machine learning.
          Forestify is a dynamic research project aimed at monitoring and analyzing vegetation health, particularly focusing on tree life, using cutting-edge remote sensing techniques. 
          Our comprehensive approach encompasses data collection, analysis, visualization, and development of user-friendly applications. 
          Leveraging Google Earth Engine (GEE) and sophisticated data analysis methods, we compute the Normalized Difference Vegetation Index (NDVI) to assess vegetation vitality, 
          complemented by land cover classification for detailed insights. Our team employs Folium for interactive map visualization, 
          enabling users to explore vegetation density in specific regions. By integrating diverse datasets and methodologies, we aspire to contribute to environmental monitoring and tree restoration initiatives. 
          </p>
        </div>
        <h1 className="text">Our Team</h1>
        <div className="underline"></div>
        <div className="card-container">
          {/* Four cards */}
          <Card
          imageUrl={jun}
          title="Jun"
          text="Student"

          />
          <Card
          imageUrl={azfar}
          title="Azfar"
          text="Student"

          />
          <Card
          imageUrl={asad}
          title="Asad"
          text="Student"

          />
          <Card
          imageUrl={arhum}
          title="Arhum"
          text="Student"
          
          />
        </div>
        </div>
      </div>
  );
};

export default AboutPage;
