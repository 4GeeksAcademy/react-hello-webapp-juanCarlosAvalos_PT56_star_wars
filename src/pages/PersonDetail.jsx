import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PersonDetail = () => {
  const { uid } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setPerson(data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ ERROR:", err);
        setLoading(false);
      });
  }, [uid]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-warning" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-white mt-3">Cargando información...</p>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">No se pudo cargar la información</div>
        <Link to="/" className="btn btn-warning">Volver</Link>
      </div>
    );
  }

  const props = person.properties;
  
  const imageUrl = imageError 
    ? `https://placehold.co/400x500/667eea/ffffff/webp?text=${encodeURIComponent(props.name)}`
    : `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`;

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-6">
          <img
            src={imageUrl}
            alt={props.name}
            className="img-fluid rounded"
            style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }}
            onError={() => setImageError(true)}
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="text-warning mb-3">{props.name}</h1>
          <p className="text-white lead">
            {person.description || "Un personaje del universo de Star Wars."}
          </p>
        </div>
      </div>

      <div className="card bg-dark border-warning mb-5">
        <div className="card-header bg-warning text-dark">
          <h4 className="mb-0">Información del Personaje</h4>
        </div>
        <div className="card-body">
          <div className="row text-center g-4">
            <div className="col-md-2 col-6">
              <div className="p-3 border border-secondary rounded">
                <i className="fas fa-ruler-vertical text-warning mb-2" style={{ fontSize: '1.5rem' }}></i>
                <h6 className="text-warning mb-2">Altura</h6>
                <p className="text-white fw-bold mb-0">{props.height} cm</p>
              </div>
            </div>

            <div className="col-md-2 col-6">
              <div className="p-3 border border-secondary rounded">
                <i className="fas fa-weight text-warning mb-2" style={{ fontSize: '1.5rem' }}></i>
                <h6 className="text-warning mb-2">Peso</h6>
                <p className="text-white fw-bold mb-0">{props.mass} kg</p>
              </div>
            </div>

            <div className="col-md-2 col-6">
              <div className="p-3 border border-secondary rounded">
                <i className="fas fa-fill-drip text-warning mb-2" style={{ fontSize: '1.5rem' }}></i>
                <h6 className="text-warning mb-2">Cabello</h6>
                <p className="text-white fw-bold mb-0">{props.hair_color}</p>
              </div>
            </div>

            <div className="col-md-2 col-6">
              <div className="p-3 border border-secondary rounded">
                <i className="fas fa-user text-warning mb-2" style={{ fontSize: '1.5rem' }}></i>
                <h6 className="text-warning mb-2">Piel</h6>
                <p className="text-white fw-bold mb-0">{props.skin_color}</p>
              </div>
            </div>

            <div className="col-md-2 col-6">
              <div className="p-3 border border-secondary rounded">
                <i className="fas fa-eye text-warning mb-2" style={{ fontSize: '1.5rem' }}></i>
                <h6 className="text-warning mb-2">Ojos</h6>
                <p className="text-white fw-bold mb-0">{props.eye_color}</p>
              </div>
            </div>

            <div className="col-md-2 col-6">
              <div className="p-3 border border-secondary rounded">
                <i className="fas fa-venus-mars text-warning mb-2" style={{ fontSize: '1.5rem' }}></i>
                <h6 className="text-warning mb-2">Género</h6>
                <p className="text-white fw-bold mb-0">{props.gender}</p>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="p-3 border border-warning rounded text-center">
                <i className="fas fa-birthday-cake text-warning mb-2" style={{ fontSize: '2rem' }}></i>
                <h5 className="text-warning mb-2">Año de Nacimiento</h5>
                <p className="text-white fw-bold fs-4 mb-0">{props.birth_year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <Link to="/" className="btn btn-warning btn-lg">
          <i className="fas fa-arrow-left me-2"></i>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default PersonDetail;