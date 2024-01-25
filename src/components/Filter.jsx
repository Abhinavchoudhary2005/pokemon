import React, { useState } from "react";
import data from "./ButtonData";

function Filter({ filter }) {
  const [clickedButton, setClickedButton] = useState("All");

  function handleClick(button) {
    setClickedButton(button);
    filter(button);
  }

  return (
    <div className="buttons">
      {data.map((data) => (
        <button
          onClick={() => handleClick(data.type)}
          style={{
            border: clickedButton === data.type ? "2px solid white" : "none",
          }}
        >
          {data.type}
        </button>
      ))}
    </div>
  );
}

export default Filter;
