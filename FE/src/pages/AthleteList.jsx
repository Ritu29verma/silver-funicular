import React, { useState, useEffect } from "react";
import { fetchAllAthletes } from "../api.js";
import { Link } from "react-router-dom";

const AthleteList = () => {
  const [athletes, setAthletes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAthletes = async () => {
      try {
        const data = await fetchAllAthletes();
        setAthletes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadAthletes();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Athlete List</h1>
      {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}
      {!error && athletes.length === 0 && <p className="text-center text-lg">No athletes found.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {athletes.map((athlete) => (
          <Link
            key={athlete.athleteId}
            to={`/allAthletes/${athlete.athleteId}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">{athlete.fullName}</h2>
              <p className="text-gray-500">Athlete ID: {athlete.athleteId}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AthleteList;
