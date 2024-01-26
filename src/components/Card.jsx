import React from "react";

function Card(props) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div class="card" style={{ width: "18rem" }}>
      <img src={props.img} class="card-img-top" alt="..." />
      <div class="card-body">
        <h3 class="card-title">{capitalizeFirstLetter(props.name)}</h3>
        <p class="card-text">
          <b>Type :- </b>
          {props.type}
        </p>
        <p class="card-text">
          <b>Ability :- </b>
          {props.ability}
        </p>
      </div>
    </div>
  );
}

export default Card;
