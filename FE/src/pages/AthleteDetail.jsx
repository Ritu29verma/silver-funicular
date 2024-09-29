import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AthleteDetail = () => {
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const { athleteId } = useParams();
  const navgate = useNavigate();


  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/athletes/allAthletes/${athleteId}`);
        setAthlete(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching athlete details", error);
        setLoading(false);
      }
    };

    fetchAthlete();
  }, [athleteId]);

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading athlete details...</div>;
  }

  if (!athlete) {
    return <div className="text-center text-xl mt-10">No athlete found with ID {athleteId}</div>;
  }

  const handleOpenForm = () => {
    navgate(`/multi-step-form?athleteId=${athlete.athleteId}`);
  };

  return (
    <div className=" min-h-screen flex items-center bg-[#ADBC9F]">
      <div className="w-1/2 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-[#12372A] text-white text-center py-6">
          <h1 className="text-3xl font-bold">{athlete.fullName}</h1>
          <p className="text-lg">Athlete ID: {athlete.athleteId}</p>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700">
              <span className="font-semibold">Sport:</span> {athlete.sport}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Team/Club:</span> {athlete.teamClubName}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Nationality:</span> {athlete.nationality}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Ranking:</span> {athlete.ranking}
            </p>
          </div>

          <div>
            <p className="text-gray-700">
              <span className="font-semibold">Medications:</span> {athlete.medications}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Previous Injuries:</span> {athlete.previousInjuries}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Surgeries:</span> {athlete.surgeries}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Chronic Conditions:</span> {athlete.chronicConditions}
            </p>
          </div>
        </div>

        <div className="p-6 bg-gray-100">
          <p className="text-gray-700">
            <span className="font-semibold">Physician Name:</span> {athlete.physicianName}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Physician Contact Number:</span> {athlete.physicianContactNumber}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Physician Email:</span> {athlete.physicianEmail}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">WADA Registration:</span> {athlete.wadaRegistration}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Biological Passport Number:</span> {athlete.biologicalPassportNumber}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Last Test Date:</span> {athlete.lastTestDate}
          </p>
        </div>
       <div className='flex items-center justify-center p-5'>
       <button onClick={handleOpenForm} className="bg-[#12372A] text-white px-4 py-2 rounded">
        Open Doping Verification Form
      </button>
       </div>
      </div>
    </div>
  );
};

export default AthleteDetail;
