import { useState, useEffect } from "react";
import Banner from "./Banner";
import Carousel from "./Carousel";
import LightRays from "./LightRays";
import Movie from "./Movie";
import { useOutletContext } from "react-router-dom";

const Body = () => {
  const { results } = useOutletContext() || { results: [] }; // fallback if not using Outlet context

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
          pointerEvents: "none",
          backgroundColor: "#111111",
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#e6e2eaff"
          raysSpeed={1.5}
          lightSpread={0.9}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.5}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Banner />
        {/* <Carousel /> */}

        {/* Render search results */}
        <div>
          {results && results.length > 0 ? (
            results.map((movie) => <Movie key={movie._id} movie={movie} />)
          ) : (
            <p style={{ color: "white", textAlign: "center" }}>No results yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
