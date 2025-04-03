import React from "react";

function Pet({pet, onClick}) {

  return (
    <div className="card" data-testid="pet">
      <div className="content">
        <span className="header">
          {pet.gender === 'female' ? '♀ ' : '♂ ' }
          {pet.name}
        </span>
        <div className="meta">
          <span className="date">{pet.type}</span>
        </div>
        <div className="description">
          <p>Age: {pet.age} y</p>
          <p>Weight: {pet.weight} lbs.</p>
        </div>
      </div>
      <div className="extra content">
        {pet.isAdopted ? <button className="ui disabled button">Already adopted</button> :  <button onClick={() => onClick(pet)} className="ui primary button">Adopt pet</button>}
       
      </div>
    </div>
  );
}

export default Pet;