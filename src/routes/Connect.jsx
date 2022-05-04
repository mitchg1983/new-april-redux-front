import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import { useScroll } from "@use-gesture/react";

export default function Connect() {
  // console.log("Begingging Connect route...");

  const [clicked, setClicked] = useState("");

  const location = useLocation();
  const data = location.state;

  //scroll animation code sourced from https://medium.com/dailyjs/horizontal-scroll-animation-fc39ae43cbe5
  const [style, set] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)",
  }));

  const clamp = (value) => {
    if (value > 0) {
      return value > 30 ? 30 : value;
    } else {
      return value < -30 ? -30 : value;
    }
  };

  const bind = useScroll((event) => {
    set({
      transform: `perspective(500px) rotateY(${
        event.scrolling ? clamp(event.delta[0]) : 0
      }deg)`,
    });
  });

  // console.log("Connect data...", data);

  return (
    <div className="connect">
      <div className="director-row" {...bind()}>
        {data.map((movie, idx) => {
          const posterPath = movie.poster;
          return (
            <animated.div
              key={`user-mapped-${idx}`}
              className="poster-tab"
              style={{
                ...style,
              }}
            >
              <img
                className="movie-poster"
                src={`http://localhost:3000/${posterPath}`}
                onClick={(e) => {
                  const thisClass = e.target.className;
                  // console.log("thisClass,", thisClass);
                  let newClass =
                    thisClass === "movie-poster"
                      ? "movie-poster clicked"
                      : "movie-poster";
                  // console.log("newClass,", newClass);
                  e.target.className = newClass;
                  return;
                }}
              ></img>
              <div className="poster-data">
                <p>{movie.title}</p>
                <p>{movie.director}</p>
                <p>Watched: {movie.userStats.watched}</p>
                <p>Liked: {movie.userStats.liked}</p>
              </div>
            </animated.div>
          );
        })}
      </div>
    </div>
  );
}
