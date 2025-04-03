import React, { useState, useEffect} from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({type: "all"});
  const [filteredList, setFilteredList] = useState(pets)

  useEffect(() => {
    renderPets()
  },[])

  const petsToShow = filters.type === "all" || filters.type === ""
  ? pets
  : pets.filter(p => p.type === filters.type);

async function renderPets() {
  try {
    const r = await fetch(`http://localhost:3001/pets`)
    if(!r.ok) {
      throw new Error("💥 Error");
    }
    const data = await r.json()
    setPets(data)
  }catch (error) {console.error("❌ Caught error:", error);}
}

function filterStuff(val) {
let filterObj = {}
if(val !== "" && val !== "all") {
  filterObj = {"type": val}
} else {
  filterObj = {"type": "all"}
}
setFilters(filterObj)
goFilter()
}

function goFilter() {
let filtList = pets;
if(filters.type !== "all" && filters.type !== "") {
  filtList = pets.filter(p => (
    p.type === filters.type
  ))
} else {
  filtList = pets
}
setFilteredList(filtList)
}

async function handleAdopt(pet) {
  try {
    const r = await fetch(`http://localhost:3001/pets/${pet.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pet)
    })
    if(!r.ok) {
      throw new Error("💥 Error");
    }
    const data = await r.json()
    const updatedList = pets.map(p => (
      p.id === data.id ? data : p
    ))
    setPets(updatedList)
  }catch (error) {console.error("❌ Caught error:", error);}
}

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters filterStuff={filterStuff} filterObj={filters}/>
          </div>
          <div className="twelve wide column">
     <PetBrowser 
  pets={petsToShow}
  onAdoptSend={handleAdopt}
/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;