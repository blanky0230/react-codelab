import * as React from "react";
import "./styles.css";
import World from "./game_of_life/World";
import "./World.css";

export default function App() {
  return (
    <div className="App">
      <World />
    </div>
  );
}
