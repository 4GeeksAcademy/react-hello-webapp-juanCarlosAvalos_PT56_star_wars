import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VehicleDetail = () => {
  const { uid } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.tech/api/vehicles/${uid}`)
      .then((res) => res.json())
      .then((data) => setVehicle(data.result));
  }, [uid]);

  if (!vehicle) return <p>Cargando...</p>;

  return (
    <div className="card p-4">
      <h2>{vehicle.properties.name}</h2>
      <p>Modelo: {vehicle.properties.model}</p>
      <p>Fabricante: {vehicle.properties.manufacturer}</p>
      <p>Capacidad: {vehicle.properties.passengers}</p>
    </div>
  );
};

export default VehicleDetail;
