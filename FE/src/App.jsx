import { useState } from 'react'
import InvestigatorForm from './pages/InvestigatorForm'
import AthleteForm from './pages/AthleteForm';
import LoginForm from './pages/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
function App() {
 
  return (
    <>
    <Router>
          <Routes>
          <Route path="/investigator-form" element={<InvestigatorForm />} />
          <Route path="/athlete-form" element={<AthleteForm/>} />
          <Route path="/login" element={<LoginForm />} />
          </Routes>
    </Router>
  </>
  )
}

export default App
