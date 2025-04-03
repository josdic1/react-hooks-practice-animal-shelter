import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const petsToShow = filters.type === "all"
    ? pets
    : pets.filter(p => p.type === filters.type);

  useEffect(() => {
    fetchPets();
  }, []);

  async function fetchPets() {
    let url = "http://localhost:3001/pets";
    if (filters.type !== "all") {
      url += `?type=${filters.type}`;
    }

    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error("💥 Error");
      const data = await r.json();
      setPets(data);
    } catch (error) {
      console.error("❌ Caught error:", error);
    }
  }

  function handleFilterChange(val) {
    setFilters({ type: val });
  }

  function handleAdopt(petId) {
    const updatedPets = pets.map(p =>
      p.id === petId ? { ...p, isAdopted: true } : p
    );
    setPets(updatedPets);
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui grid">
        <div className="four wide column">
          <Filters 
            filterObj={filters}
            onChangeType={handleFilterChange}
            onFindPetsClick={fetchPets}
          />
        </div>
        <div className="twelve wide column">
          <PetBrowser 
            pets={petsToShow}
            onAdoptPet={handleAdopt}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
