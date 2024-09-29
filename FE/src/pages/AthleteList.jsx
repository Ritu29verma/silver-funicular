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
    <div className="bg-[#12372A] min-h-screen">
      <div className="p-8">
        {/* Header */}
        <div className="text-left font-bold mb-4">
          <div className="text-5xl text-[#ADBC9F]"> Champion Integrity, No Shortcuts.</div>
          </div>
          <div className="flex justify-between mb-6">
          <div className="text-4xl font-bold text-white mt-4 text-left mr-4 ">Registered Athletes.</div>
          <input type="search" placeholder="Search..." className="border rounded-lg p-2 w-1/4" />
          </div>
   

        {/* Error or Empty State */}
        {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}
        {!error && athletes.length === 0 && (
          <p className="text-center text-lg text-white">No athletes found.</p>
        )}

        {/* Athletes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-8">
          {athletes.map((athlete) => (
            <Link
              key={athlete.athleteId}
              to={`/allAthletes/${athlete.athleteId}`}
              className="block bg-[#ADBC9F] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4"
            >
              <div className="text-center">
                <h2 className="text-xl font-semibold text-[#12372A]">{athlete.fullName}</h2>
                <p className="text-[#12372A]">Athlete ID: {athlete.athleteId}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AthleteList;
