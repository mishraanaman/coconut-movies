import { useState, useEffect } from "react";
import Banner from "./Banner";
import Carousel from "./Carousel";
import LightRays from "./LightRays";
import Movie from "./Movie";
import { useOutletContext } from "react-router-dom";

const Body = () => {
  const { results } = useOutletContext() || { results: [] }; // fallback if not using Outlet context

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh"}}>
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
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#f7f3f1ff"
          raysSpeed={3}
          lightSpread={4}
          rayLength={4}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={2.0}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Banner />
        <Carousel />

        {/* Render search results */}
        <div className="flex flex-wrap justify-center py-2 px-4">
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
