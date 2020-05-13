import React from "react";
import "./homePage.css";
import Main from "./header";
export default function Home() {
  return (
    <div className="Home">
      <Main />
      <div className="lander">
        <h1>Pizzaroo</h1>
        <p>A Simple Delivery App</p>
      </div>
    </div>
  );
}
