import React, { useEffect } from "react";
import "./home.css";
import "animate.css";
import logo from "../../assets/logo IHT.png";
import background from "../../assets/background.jpg";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  let history = useHistory();
  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/login");
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
