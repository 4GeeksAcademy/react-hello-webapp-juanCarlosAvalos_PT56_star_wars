import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store.jsx";

const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Star Wars Blog
        </Link>
        <div className="dropdown">
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Favoritos ({store.favorites.length})
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites.length === 0 ? (
              <li className="dropdown-item">No hay favoritos</li>
            ) : (
              store.favorites.map((fav, index) => (
                <li key={index} className="dropdown-item d-flex justify-content-between">
                  <span>{fav.name}</span>
                  <i
                    className="fas fa-trash"
                    onClick={() => actions.removeFavorite(fav)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;