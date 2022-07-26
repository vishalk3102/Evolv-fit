import React from "react";

const Workout = () => {
  const WorkoutStyle = {
    // border: "2px solid red",
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "6rem",
    backgroundColor: "#1E262F",
    color: "#fff",
  };
  return (
    <>
      <h2 style={WorkoutStyle}>Workout</h2>
    </>
  );
};

export default Workout;
