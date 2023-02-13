import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
  const [winners, setWinners] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://fair-lime-mussel-tam.cyclic.app/leaderboard")
      .then((res) => {
        console.log(res.data);
        setWinners(res.data);
        // console.log(winners);
      })
      .catch((err) => console.log(err));
  }, []);
  return (

    <div className="text-center">
      <button onClick={() => navigate("/")} className="btn btn-primary m-3">
        Go back
      </button>
      <h1 className="mt-2">Top Winners</h1>
      <div>
        {winners
          .sort((a, b) => {
            if (a.wins > b.wins) {
              return -1;
            }
            if (a.wins < b.wins) {
              return 1;
            }
            return 0;
          })
          .map((winner) => {
            return (
              <div key={winner.id} className="border border-primary m-5">
                <h2>{winner?.name?.english}</h2>
                <h4>Wins: {winner.wins}</h4>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${winner.id}.png`}
                  alt="pokemon"
                  style={{ height: 200 }}
                />
              </div>
            );
          })}
      </div>
      <button onClick={() => navigate("/")} className="btn btn-primary m-3">
        Go back
      </button>
    </div>
  );
}
