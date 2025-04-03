import React from "react";

function Filters({filterStuff, filters}) {

  const onFilterSelect = (e) => {
   const {value } = e.target
   filterStuff(value)
  }

  return (
    <div className="ui form">
      <h3>Animal type</h3>
      <div className="field">
        <select name="type" id="type" value={filters} aria-label="type" onChange={onFilterSelect}>
          <option value="all">All</option>
          <option value="cat">Cats</option>
          <option value="dog">Dogs</option>
          <option value="micropig">Micropigs</option>
        </select>
      </div>

      <div className="field">
        <button className="ui secondary button">Find pets</button>
      </div>
    </div>
  );
}

export default Filters;