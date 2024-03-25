import React from 'react';
import './AboutPage.css';
import appLogo from '../Assets/logo.png';
import azfar from '../Assets/azfarpfp.png';
import asad from '../Assets/asadpfp.png';
import jun from '../Assets/junpfp.png';
import arhum from '../Assets/arhumpfp.png';
import forest from '../Assets/forest.png';
import "./AboutPage.css";

export default function App() {

  window.onscroll = function () {
    jet();
  };

  function jet() {
    var ilake = document.getElementById("head");
    ilake.style.top = "0px";
    ilake.style.position = "sticky";
  }

  window.addEventListener("scroll", () => {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var wnd = window.innerHeight;
      var rtop = reveals[i].getBoundingClientRect().top;
      var rpoint = 100;

      if (rtop < wnd - rpoint) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  });
  return (
    <div classNameName="App">

      <div id="head"></div>
      <main>
        <div id="front">
        <img src={appLogo} alt="Logo" className="logoImg" style={{ width: "300px", height: "auto", transform: "translateY(10%)"}} />

          <h1 style={{ textAlign: "center", fontSize: "4em" }}>Welcome to Forestify!</h1>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/about-us-1805547-1537820.png"
            alt="font"
          />
          <p>
            Welcome to Forestify, where our mission is to revolutionize environmental monitoring and conservation efforts through satellite imagery and machine learning.
            Forestify is a dynamic research project aimed at monitoring and analyzing vegetation health, particularly focusing on tree life, using cutting-edge remote sensing techniques.
          </p>
        </div>

        <div id="first" className="reveal">
          <img src={forest} alt="Logo" className="logoImg" />

          <div>
            <h1 style={{ color: "white" }}>An Innovative approach to desertification</h1>
            <p>

              Our comprehensive approach encompasses data collection, analysis, visualization, and development of user-friendly applications.
              Leveraging Google Earth Engine (GEE) and sophisticated data analysis methods, we compute the Normalized Difference Vegetation Index (NDVI) to assess vegetation vitality,
              complemented by land cover classification for detailed insights. Our team employs Folium for interactive map visualization
              enabling users to explore vegetation density in specific regions. By integrating diverse datasets and methodologies, we aspire to contribute to environmental monitoring and tree restoration initiatives.  </p>
          </div>
        </div>

        <div id="fourth" className="reveal">
          <h2 style={{ color: "white", fontSize: "3em" }}>Meet the Team!</h2>

          <div id="fourth_cards">

            <div>
              <img
                src={asad}
                alt=" "
                style={{ width: "200px", height: "200px" }} // Adjust width and height as needed
              />
              <p>Asad</p>
            </div>
            <div>
              <img
                src={azfar}
                alt=" "
                style={{ width: "200px", height: "200px" }} // Adjust width and height as needed

              />
              <p>Azfar</p>
            </div>
            <div>
              <img
                src={arhum}
                alt=" "
                style={{ width: "200px", height: "200px" }} // Adjust width and height as needed

              />
              <p>Arhum</p>
            </div>
            <div>
              <img
                src={jun}
                alt=" "
                style={{ width: "200px", height: "200px" }} // Adjust width and height as needed

              />
              <p>Jun</p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
