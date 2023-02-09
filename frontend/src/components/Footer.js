import React from "react";
import "./pokemon.css";

export default function Footer() {
  return (
    <nav className="navbar footer navbar-expand-lg bg-lila">
      <div className="container-fluid">
        <a className="navbar-brand text-white">PokeFight</a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link names text-white">
              {" "}
              by Clirim, Aroj, Nadia and Neelima
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
