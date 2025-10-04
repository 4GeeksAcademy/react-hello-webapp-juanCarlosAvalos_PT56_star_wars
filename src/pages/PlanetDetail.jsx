import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlanetDetail = () => {
  const { uid } = useParams();
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.tech/api/planets/${uid}`)
      .then((res) => res.json())
      .then((data) => setPlanet(data.result));
  }, [uid]);

  if (!planet) return <p>Cargando...</p>;

  return (
    <div className="card p-4">
      <h2>{planet.properties.name}</h2>
      <p>Clima: {planet.properties.climate}</p>
      <p>Población: {planet.properties.population}</p>
      <p>Terreno: {planet.properties.terrain}</p>
    </div>
  );
};

export default PlanetDetail;
