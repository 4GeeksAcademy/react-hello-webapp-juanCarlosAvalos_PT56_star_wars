import React, { useEffect, useContext } from "react";
import { Context } from "../store.jsx";
import Card from "../components/Card.jsx";

const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.people.length === 0) {
      fetch("https://www.swapi.tech/api/people")
        .then(res => res.json())
        .then(data => {
          actions.setPeople(data.results);
        })
        .catch(err => console.error("Error fetching people:", err));
    }

    if (store.planets.length === 0) {
      fetch("https://www.swapi.tech/api/planets")
        .then(res => res.json())
        .then(data => {
          actions.setPlanets(data.results);
        })
        .catch(err => console.error("Error fetching planets:", err));
    }

    if (store.vehicles.length === 0) {
      fetch("https://www.swapi.tech/api/vehicles")
        .then(res => res.json())
        .then(data => {
          actions.setVehicles(data.results);
        })
        .catch(err => console.error("Error fetching vehicles:", err));
    }
  }, []);

  const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      {/* Sección de Personajes */}
      <div className="mb-5">
        <h2 className="mb-3">
          <i className="fas fa-users me-2"></i>
          Personajes ({store.people.length})
        </h2>
        {store.people.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <div className="d-flex overflow-auto pb-3">
            {store.people.map(person => (
              <Card key={person.uid} data={person} />
            ))}
          </div>
        )}
      </div>

      {/* Sección de Planetas */}
      <div className="mb-5">
        <h2 className="mb-3">
          <i className="fas fa-globe me-2"></i>
          Planetas ({store.planets.length})
        </h2>
        {store.planets.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <div className="d-flex overflow-auto pb-3">
            {store.planets.map(planet => (
              <Card key={planet.uid} data={planet} />
            ))}
          </div>
        )}
      </div>

      {/* Sección de Vehículos */}
      <div className="mb-5">
        <h2 className="mb-3">
          <i className="fas fa-rocket me-2"></i>
          Vehículos ({store.vehicles.length})
        </h2>
        {store.vehicles.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <div className="d-flex overflow-auto pb-3">
            {store.vehicles.map(vehicle => (
              <Card key={vehicle.uid} data={vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;