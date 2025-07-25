import { useState, useEffect } from "react";
import starterPlantImage from "../assets/plant_starter.png";
import "./Home.css";
import { formatTime, isCooldownOver, timeLeft } from "../utils/time";

export default function Home() {
  const [plants, setPlants] = useState(() => {
    return JSON.parse(localStorage.getItem("plants")) || [];
  });

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);

  const addPlant = () => {
    const name = prompt("Name your new plant:");
    if (!name) return;

    const newPlant = {
      name,
      lastWateredAt: null,
    };
    setPlants([...plants, newPlant]);
  };

  const waterPlant = (index) => {
    const nowTime = Date.now();
    const audio = new Audio(import.meta.env.BASE_URL + "sounds/water.mp3");
    audio.play();

    const updatedPlants = [...plants];
    updatedPlants[index].lastWateredAt = nowTime;
    setPlants(updatedPlants);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>
        <img
          src={starterPlantImage}
          alt="Starter plant"
          style={{
            height: "2em",
            verticalAlign: "middle",
            marginRight: "10px",
          }}
          className="shake"
        />
        Your Plant Garden
      </h1>

      {/* Add Plant Button */}
      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={addPlant}
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#2196F3",
            color: "white",
            border: "2px solid white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🌱 Add Plant
        </button>
      </div>

      {/* All Plants */}
      <div style={{ marginTop: "3rem" }}>
        {plants.length === 0 ? (
          <p style={{ color: "lightgray" }}>No plants yet. Start growing!</p>
        ) : (
          plants.map((plant, index) => {
            const canWater = isCooldownOver(now, plant.lastWateredAt);
            const remaining = timeLeft(now, plant.lastWateredAt);

            return (
              <div key={index} style={{ margin: "20px" }}>
                <img
                  src={starterPlantImage}
                  alt={plant.name}
                  style={{ width: "100px" }}
                  className="shake"
                />
                <p style={{ color: "white", marginTop: "5px" }}>{plant.name}</p>

                <button
                  onClick={() => waterPlant(index)}
                  disabled={!canWater}
                  style={{
                    padding: "6px 16px",
                    fontSize: "0.9rem",
                    backgroundColor: canWater ? "#4CAF50" : "#888",
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "4px",
                    cursor: canWater ? "pointer" : "not-allowed",
                  }}
                >
                  💧 Water
                </button>

                {!canWater && (
                  <p style={{ color: "lightgray", marginTop: "5px" }}>
                    Next water in: {formatTime(remaining)}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
