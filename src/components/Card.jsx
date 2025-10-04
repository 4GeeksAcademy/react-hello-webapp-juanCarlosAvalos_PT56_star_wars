import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store.jsx";

const Card = ({ data }) => {
  const { store, actions } = useContext(Context);
  const [imageError, setImageError] = useState(false);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);

  const getEntityType = () => {
    if (data.url && data.url.includes("/people/")) return "people";
    if (data.url && data.url.includes("/planets/")) return "planets";
    if (data.url && data.url.includes("/vehicles/")) return "vehicles";
    return "people";
  };

  const entityType = getEntityType();

  const getImageSources = () => {
    const type = entityType;
    const uid = data.uid;

    const imageMap = {
      people: "characters",
      planets: "planets",
      vehicles: "vehicles"
    };

    const placeholderColors = {
      people: "667eea/ffffff",
      planets: "f093fb/ffffff",
      vehicles: "4facfe/ffffff"
    };

    return [

      `https://starwars-visualguide.com/assets/img/${imageMap[type]}/${uid}.jpg`,

      `https://placehold.co/400x300/${placeholderColors[type]}/webp?text=${encodeURIComponent(data.name)}`,

      `https://placehold.co/400x300/ffc107/000000/webp?text=${encodeURIComponent(data.name)}`
    ];
  };

  const imageSources = getImageSources();

  const getPlaceholderDesign = () => {
    const designs = {
      people: {
        icon: "fa-user-astronaut",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
      planets: {
        icon: "fa-globe-americas",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      },
      vehicles: {
        icon: "fa-space-shuttle",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      }
    };
    return designs[entityType] || designs.people;
  };

  const design = getPlaceholderDesign();

  const getDetailRoute = () => {
    const routeMap = {
      people: "person",
      planets: "planet",
      vehicles: "vehicle"
    };
    return `/${routeMap[entityType]}/${data.uid}`;
  };

  const isFavorite = store.favorites.some(
    fav => fav.uid === data.uid && fav.name === data.name
  );

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      actions.removeFavorite(data);
    } else {
      actions.addFavorite(data);
    }
  };


  const handleImageError = () => {
    if (currentSourceIndex < imageSources.length - 1) {
      setCurrentSourceIndex(prev => prev + 1);
    } else {
      setImageError(true);
    }
  };

  return (
    <div className="card m-2" style={{ minWidth: "250px", maxWidth: "250px", flexShrink: 0 }}>
      {imageError ? (
        <div
          style={{
            height: '300px',
            background: design.gradient,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            opacity: 0.5
          }}></div>

          <i
            className={`fas ${design.icon}`}
            style={{
              fontSize: '5rem',
              color: '#fff',
              textShadow: '0 4px 6px rgba(0,0,0,0.3)',
              marginBottom: '10px',
              position: 'relative',
              zIndex: 1
            }}
          ></i>

          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(0,0,0,0.3)',
              color: '#fff',
              padding: '5px 10px',
              borderRadius: '15px',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}
          >
            #{data.uid}
          </div>
        </div>
      ) : (
        <img
          key={currentSourceIndex}
          src={imageSources[currentSourceIndex]}
          className="card-img-top"
          alt={data.name}
          onError={handleImageError}
          style={{
            height: "300px",
            width: "100%",
            objectFit: "cover"
          }}
        />
      )}

      <div className="card-body">
        <h5 className="card-title text-truncate" title={data.name}>
          {data.name}
        </h5>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Link to={getDetailRoute()} className="btn btn-primary btn-sm">
            Ver más
          </Link>
          <button
            className={`btn btn-sm ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
            onClick={handleFavorite}
            title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <i className={`fa${isFavorite ? "s" : "r"} fa-heart`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;