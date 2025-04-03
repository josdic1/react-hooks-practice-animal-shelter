import React from "react";
import Pet from "./Pet";

function PetBrowser({pets, onAdoptSend}) {

const onAdopt = (pet) => {
  const adoptedPet = {
    ...pet,
    isAdopted: true
  }
  onAdoptSend(adoptedPet)
}

  return <div className="ui cards">
    {pets.map(pet => (
      <Pet key={pet.id} pet={pet} onClick={onAdopt}/>
    ))}
  </div>;
}

export default PetBrowser;