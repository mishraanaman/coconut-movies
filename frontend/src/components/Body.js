import { useState, useEffect } from "react";
import Banner from "./Banner";
import Carousel from "./Carousel";
import LightRays from "./LightRays";

const Body = () => {

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      {/* Light rays background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          pointerEvents: "none", backgroundColor: "#ffffffff"
        }}
      >
        <LightRays
          raysOrigin="bottom-center"
          raysColor="#ffffffff"
          raysSpeed={2}
          lightSpread={2}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Banner />
        <Carousel />
      </div>
    </div>
  );
};

export default Body;
