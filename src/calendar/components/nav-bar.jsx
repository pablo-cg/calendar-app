import React from 'react';

export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark px-4 mb-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; Pablo
      </span>
      <button className="btn btn-outline-danger">
        <span>
          <i className="fas fa-sign-out-alt"></i>
          &nbsp; Salir
        </span>
      </button>
    </div>
  );
};
