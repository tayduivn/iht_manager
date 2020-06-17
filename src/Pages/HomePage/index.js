import React from "react";
import "./home.css";
import "animate.css";
import logo from "../../assets/logo IHT.png";
import background from "../../assets/background.jpg";

const HomePage = () => {
  return (
    <div
      className="content"
      style={{
        background: "white",
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <h1 className='animate__animated animate__zoomInDown' style={{color: 'red', fontSize: "60px"}}>IHT Logictics</h1> */}
      <img
        className="animate__animated animate__zoomInDown"
        src={logo}
        alt=""
        width="300"
        height="250"
      />
    </div>
  );
};

export default HomePage;
