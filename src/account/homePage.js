import React from "react";
import "./homePage.css";
import Header from "../app/layout/header";
import ParticlesBg from "particles-bg";
export default function Home() {

      let config = {
        num: [4, 7],
        rps: 0.1,
        radius: [5, 40],
        life: [1.5, 3],
        v: [2, 3],
        tha: [-40, 40],
        alpha: [0.6, 0],
        scale: [.1, 0.4],
        position: "all",
        color: ["#ffff00", "#ff0000"],
        cross: "dead",
        // emitter: "follow",
        random: 15
      };

      if (Math.random() > 0.85) {
        config = Object.assign(config, {
          onParticleUpdate: (ctx, particle) => {
            ctx.beginPath();
            ctx.rect(
              particle.p.x,
              particle.p.y,
              particle.radius * 2,
              particle.radius * 2
            );
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.closePath();
          }
        });
      }

  return (
    <div className="Home">
      <div className="lander">
        <h1>Pizzaroo</h1>
        <p>A Simple Delivery App</p>
      </div>
      <ParticlesBg color="#ffffff" num={20} type="custom" config={config} bg={true} />
    </div>

  );
}
