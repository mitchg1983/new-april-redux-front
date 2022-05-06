import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import { useScroll } from "@use-gesture/react";

export default function Connect() {
  // console.log("Connect props...", props)
  // console.log("Begingging Connect route...");

  const [clicked, setClicked] = useState("");

  const location = useLocation();
  const data = location.state;

  // console.log("Connect data...", data);

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

  // const updateUserWatchList = async (list, id) => {

  //   const updatedWatchedData = [...list, id]

  //   const response = await fetch(
  //     "http://localhost:3100/users/update-user-watched/",
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedWatchedData),
  //     }
  //   );
  //   const dataWL = await response.json();
  //   console.log(dataWL.payload);
  //   return;
  // };

  const updateUserMovieData = (thisUser, clickedMovie) => {
    const findMovieByName = async (req, res) => {
      // console.log("User clicked...", clickedMovie);
      const response = await fetch(
        `http://localhost:3100/movies/find-movie-by-name/${clickedMovie}`
      );
      const dataMD = await response.json();
      // console.log(data.payload[0]);
      return dataMD.payload[0];
    };

    const foundMovie = findMovieByName();

    const findUserByName = async (req, res) => {
      // console.log("Beginning findUserByName");
      // console.log(data.thisUser);
      const response = await fetch(
        `http://localhost:3100/users/find-user-by-name/${data.thisUser}`
      );
      const dataUN = await response.json();
      // console.log("findUser returned this...", dataUN.payload[0])
      return dataUN.payload[0];
    };

    const updateData = async (req, res) => {
      const movieId = await foundMovie;

      const foundThem = await findUserByName();

      console.log("watchedList is", foundThem.watched);
      console.log("movie picked id is", movieId._id);

      const tempList = foundThem.watched;
      console.log(tempList);

      let scrubbedList = [...tempList, movieId._id]
      
      if (tempList.length > 0) {
        tempList.map((id, idx) => {
          console.log("mapping", id, idx);
          console.log(movieId._id);

          if (movieId._id === id) {
            console.log("got one");
            console.log(scrubbedList);
            scrubbedList = scrubbedList.splice(idx, 1)
          }
        });
      }

      const updatedData = {
        username: data.thisUser,
        watched: scrubbedList,
      };

      const response = await fetch("http://localhost:3100/users/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const putData = await response.json();
      return putData;
    };

    updateData();
  };

  return (
    <div className="connect">
      <div className="director-row" {...bind()}>
        {data.catalogue.map((movie, idx) => {
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
                movietitle={movie.title}
                onClick={(e) => {
                  const thisClass = e.target.className;
                  // console.log("thisUser is...", data.thisUser);

                  const clickedMovie = Object.values(e.target)[1].movietitle;

                  console.log("Title of clicked movie is...", clickedMovie);

                  updateUserMovieData(data.thisUser, clickedMovie);

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
