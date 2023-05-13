import React from "react";

function Showerror({ message }) {
  return (
    <>
      <h4 style={{ textAlign: "center", fontSize: "3rem", color: "red" }}>
        sorry 😥 {message}{" "}
      </h4>
    </>
  );
}

export default Showerror;
