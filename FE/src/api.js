import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/athletes`; 

export const fetchAllAthletes = async () => {
  try {
    const response = await axios.get(`${API_URL}/allAthletes`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch athletes");
  }
};

export const fetchAthleteById = async (athleteId) => {
  try {
    const response = await axios.get(`${API_URL}/allAthletes/${athleteId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch athlete");
  }
};
