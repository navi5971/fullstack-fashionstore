import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const cartstate = useSelector((state) => state.cartReducer);

  return (
    <nav className="navbar navbar-expand-lg shadow p-3 mb-5 rounded">
      <Link to="/" className="navbar-brand">
        Navi fashionista
      </Link>

      <i className="fa-solid fa-pizza-slice"></i>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              Cart {cartstate?.cartItems?.length}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Disabled
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
