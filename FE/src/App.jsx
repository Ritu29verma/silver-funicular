import { useState } from 'react'
import InvestigatorForm from './pages/InvestigatorForm'
import AthleteForm from './pages/AthleteForm';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
function App() {
 
  return (
    <>
    <Router>
          <Routes>
          <Route path="/investigator-form" element={<InvestigatorForm />} />
          <Route path="/athlete-form" element={<AthleteForm/>} />
          </Routes>
    </Router>
  </>
  )
}

export default App
