import React, { useState } from "react";
import Nav from "./components/Nav";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [filterClick, setFilterClick] = useState("All");

  function filter(typeClicked) {
    setFilterClick(typeClicked);
  }

  return (
    <div>
      <Nav />
      <Filter filter={filter} />

      <Cards CardSelected={filterClick} />
    </div>
  );
}

export default App;
