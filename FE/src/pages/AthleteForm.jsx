import React, { useState } from 'react';
import axios from 'axios'

const AthleteRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    nationality: '',
    sport: '',
    category: '',
    teamClubName: '',
    athleteId: '',
    passportId: '',
    contactNumber: '',
    email: '',
    residentialAddress: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    coachName: '',
    coachContactNumber: '',
    coachEmail: '',
    agentName: '',
    agentContactNumber: '',
    agentEmail: '',
    majorCompetitions: '',
    ranking: '',
    previousInjuries: '',
    surgeries: '',
    chronicConditions: [],
    medications: '',
    allergies: '',
    physicianName: '',
    physicianContactNumber: '',
    physicianEmail: '',
    wadaRegistration: '',
    biologicalPassportNumber: '',
    biologicalPassport: null,
    lastTestDate: '',
    testResults: [
      { date: '', type: '', result: '', authority: '', upload: null },
    ],
    medicalReports: [],
    consentTesting: false,
    declaration: false,
    digitalSignature: null,
  });

  

  const [errors, setErrors] = useState({});
  const [medicalReports, setMedicalReports] = useState([{ file: null }]);
  const [biologicalPassport, setBiologicalPassport] = useState({ file: null });




  const validateForm = () => {
    const newErrors = {};
  
    // Check for empty fields
    const requiredFields = [
      'fullName',
      'dob',
      'gender',
      'nationality',
      'sport',
      'category',
      'teamClubName',
      'athleteId',
      'passportId',
      'contactNumber',
      'email',
      'residentialAddress',
      'emergencyContactName',
      'emergencyContactNumber',
      'coachName',
      'coachContactNumber',
      'coachEmail',
      'agentName',
      'agentContactNumber',
      'agentEmail',
      'majorCompetitions',
      'ranking',
      'previousInjuries',
      'surgeries',
      'medications',
      'allergies',
      'physicianName',
      'physicianContactNumber',
      'physicianEmail',
      'wadaRegistration',
      'biologicalPassportNumber',
      'lastTestDate',
      'consentTesting',
      'declaration',
      // 'digitalSignature',
    ];
  
    // Check for empty required fields
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        const fieldName = field.replace(/([A-Z])/g, ' $1').trim(); // Convert camelCase to readable format
        newErrors[field] = `${fieldName} is required`;
      }
    });
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.coachEmail && !emailRegex.test(formData.coachEmail)) {
      newErrors.coachEmail = 'Invalid coach email format';
    }
    if (formData.agentEmail && !emailRegex.test(formData.agentEmail)) {
      newErrors.agentEmail = 'Invalid agent email format';
    }
    if (formData.physicianEmail && !emailRegex.test(formData.physicianEmail)) {
      newErrors.physicianEmail = 'Invalid physician email format';
    }
  
    // Validate contact numbers
    const phoneRegex = /^\d{10}$/;
    if (formData.contactNumber && !phoneRegex.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Invalid contact number (should be 10 digits)';
    }
    if (formData.coachContactNumber && !phoneRegex.test(formData.coachContactNumber)) {
      newErrors.coachContactNumber = 'Invalid coach contact number (should be 10 digits)';
    }
    if (formData.agentContactNumber && !phoneRegex.test(formData.agentContactNumber)) {
      newErrors.agentContactNumber = 'Invalid agent contact number (should be 10 digits)';
    }
    if (formData.physicianContactNumber && !phoneRegex.test(formData.physicianContactNumber)) {
      newErrors.physicianContactNumber = 'Invalid physician contact number (should be 10 digits)';
    }
  
    // Check if at least one test result is added
    if (!formData.lastTestDate) newErrors.lastTestDate = 'Last Test Date is required.';
    // if (!formData.digitalSignature) newErrors.digitalSignature = 'Digital Signature is required.';
    formData.testResults.forEach((result, index) => {
      if (!result.type) newErrors[`testResults.${index}.type`] = 'Type is required.';
      if (!result.result) newErrors[`testResults.${index}.result`] = 'Result is required.';
      if (!result.authority) newErrors[`testResults.${index}.authority`] = 'Authority is required.';
    });
  
    // // Check if medical reports are uploaded
    // if (formData.medicalReports.length === 0) {
    //   newErrors.medicalReports = 'At least one medical report is required';
    // }
  
    // Set errors and return
    return newErrors;
  };
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: e.target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const medicalReportsChange = (index, e) => {
    const newMedicalReports = [...medicalReports];
    newMedicalReports[index].file = e.target.files[0];
    setMedicalReports(newMedicalReports);
  };
  // const biologicalPassportChange = (e) => {
  //   const file = e.target.files[0];
  //   setBiologicalPassport({ file });
  // };

  const addMedicalReports = () => {
    setMedicalReports([...medicalReports, { file: null }]);
  };


  const handleTestResultChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTestResults = [...formData.testResults];
    updatedTestResults[index][name] = value;
    setFormData((prevState) => ({
      ...prevState,
      testResults: updatedTestResults,
    }));
  };
  const addTestResult = () => {
    setFormData((prevState) => ({
      ...prevState,
      testResults: [
        ...prevState.testResults,
        { date: '', type: '', result: '', authority: '', upload: null },
      ],
    }));
  };


   const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form
    const newErrors = validateForm();
    setErrors(newErrors);

    console.log("Validation Errors: ", newErrors);

    if (Object.keys(newErrors).length === 0) {
      
      
      try {
        // Create FormData object to send multipart/form-data
        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('dob', formData.dob);
        data.append('gender', formData.gender);
        data.append('nationality', formData.nationality);
        data.append('sport', formData.sport);
        data.append('category', formData.category);
        data.append('teamClubName', formData.teamClubName);
        data.append('athleteId', formData.athleteId);
        data.append('passportId', formData.passportId);
        data.append('contactNumber', formData.contactNumber);
        data.append('email', formData.email);
        data.append('residentialAddress', formData.residentialAddress);
        data.append('emergencyContactName', formData.emergencyContactName);
        data.append('emergencyContactNumber', formData.emergencyContactNumber);
        data.append('coachName', formData.coachName);
        data.append('coachContactNumber', formData.coachContactNumber);
        data.append('coachEmail', formData.coachEmail);
        data.append('agentName', formData.agentName);
        data.append('agentContactNumber', formData.agentContactNumber);
        data.append('agentEmail', formData.agentEmail);
        data.append('majorCompetitions', formData.majorCompetitions);
        data.append('ranking', formData.ranking);
        data.append('previousInjuries', formData.previousInjuries);
        data.append('surgeries', formData.surgeries);
        data.append('medications', formData.medications);
        data.append('allergies', formData.allergies);
        data.append('physicianName', formData.physicianName);
        data.append('physicianContactNumber', formData.physicianContactNumber);
        data.append('physicianEmail', formData.physicianEmail);
        data.append('wadaRegistration', formData.wadaRegistration);
        data.append('biologicalPassportNumber', formData.biologicalPassportNumber);

        // // Append files
        // if (biologicalPassport.file) {
        //   data.append('biologicalPassport', biologicalPassport.file);
        // }

        // Append test results
        formData.testResults.forEach((result, index) => {
          data.append(`testResults[${index}][date]`, result.date);
          data.append(`testResults[${index}][type]`, result.type);
          data.append(`testResults[${index}][result]`, result.result);
          data.append(`testResults[${index}][authority]`, result.authority);
          if (result.upload) {
            data.append(`testResults[${index}][upload]`, result.upload);
          }
        });

        // Append medical reports
        medicalReports.forEach((medicalReport) => {
          if (medicalReport.file) {
            data.append('medicalReports', medicalReport.file);
          }
        });

        data.append('consentTesting', formData.consentTesting);
        data.append('declaration', formData.declaration);

        for (let pair of data.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }

        // Send the form data to the API
        const response = await axios.post('http://localhost:5000/api/athletes/register', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Form submission successful', response.data);
        alert('Form submitted successfully!');
      } catch (error) {
        console.error('Error submitting the form', error);
        alert('Failed to submit the form');
       
      } 
    } else {
      // Handle errors (UI feedback)
      alert('Please fix the errors before submitting.');
    }
  };
  


  return (

    <div className="bg-[#e4e4e2] p-6 min-h-screen flex flex-col items-center justify-center">
    <div className="bg-white shadow-2xl rounded-lg w-full max-w-4xl pt-4 my-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Athlete Registration Form</h2>
</div>
<form onSubmit={handleSubmit} className="bg-white shadow-2xl mt-3 rounded-lg w-full max-w-4xl p-8">

{/*   
<div className='bg-gray-100'>
<form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold flex justify-center items-center mb-4">Athlete Registration Form</h2> */}
      
      <h3 className="text-lg font-semibold mt-6 mb-2">Personal Details:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div >
          <label className="block font-medium mb-2" htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div >
          <label className="block font-medium mb-2" htmlFor="nationality">Nationality</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.nationality ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
          {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="sport">Sport</label>
          <select
            id="sport"
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.sport ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          >
            <option value="">Select Sport</option>
            <option value="Athletics">Athletics</option>
            <option value="Swimming">Swimming</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            {/* Add more sports as needed */}
          </select>
          {errors.sport && <p className="text-red-500 text-sm">{errors.sport}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="category">Category/Discipline</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        <div >
          <label className="block font-medium mb-2" htmlFor="teamClubName">Team/Club Name</label>
          <input
            type="text"
            id="teamClubName"
            name="teamClubName"
            value={formData.teamClubName}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.teamClubName ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
          {errors.teamClubName && <p className="text-red-500 text-sm">{errors.teamClubName}</p>}
        </div>

        <div>
        <label className="block font-medium mb-2" htmlFor="athleteId">Athlete ID Number</label>
          <input
            type="text"
            id="athleteId"
            name="athleteId"
            value={formData.athleteId}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.athleteId ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
          {errors.athleteId && <p className="text-red-500 text-sm">{errors.athleteId}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="passportId">Passport/Identification Number</label>
          <input
            type="text"
            id="passportId"
            name="passportId"
            value={formData.passportId}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.passportId ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
          {errors.passportId && <p className="text-red-500 text-sm">{errors.passportId}</p>}
        </div>

        <div >
          <label className="block font-medium mb-2" htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
          {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div >
          <label className="block font-medium mb-2" htmlFor="residentialAddress">Residential Address</label>
          <textarea
            id="residentialAddress"
            name="residentialAddress"
            value={formData.residentialAddress}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.residentialAddress ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          ></textarea>
          {errors.residentialAddress && <p className="text-red-500 text-sm">{errors.residentialAddress}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="emergencyContactName">Emergency Contact Person Name</label>
          <input
            type="text"
            id="emergencyContactName"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.emergencyContactName ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
          {errors.emergencyContactName && <p className="text-red-500 text-sm">{errors.emergencyContactName}</p>}
        </div>

        <div >
          <label className="block font-medium mb-2" htmlFor="emergencyContactNumber">Emergency Contact Number</label>
          <input
            type="text"
            id="emergencyContactNumber"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.emergencyContactNumber ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
          {errors.emergencyContactNumber && <p className="text-red-500 text-sm">{errors.emergencyContactNumber}</p>}
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Professional Information:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div >
          <label className="block font-medium mb-2" htmlFor="coachName">Training Coach Name</label>
          <input
            type="text"
            id="coachName"
            name="coachName"
            value={formData.coachName}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.coachName ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
          {errors.coachName && <p className="text-red-500 text-sm">{errors.coachName}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="coachContactNumber">Coach Contact Number</label>
          <input
            type="text"
            id="coachContactNumber"
            name="coachContactNumber"
            value={formData.coachContactNumber}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.coachContactNumber ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
          {errors.coachContactNumber && <p className="text-red-500 text-sm">{errors.coachContactNumber}</p>}
        </div>

        <div >
          <label className="block font-medium mb-2" htmlFor="coachEmail">Coach Email</label>
          <input
            type="email"
            id="coachEmail"
            name="coachEmail"
            value={formData.coachEmail}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.coachEmail ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
          {errors.coachEmail && <p className="text-red-500 text-sm">{errors.coachEmail}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="agentName">Agent/Manager Name</label>
          <input
            type="text"
            id="agentName"
            name="agentName"
            value={formData.agentName}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.agentName ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.agentName && <p className="text-red-500 text-sm">{errors.agentName}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="agentContactNumber">Agent/Manager Contact Number</label>
          <input
            type="text"
            id="agentContactNumber"
            name="agentContactNumber"
            value={formData.agentContactNumber}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.agentContactNumber ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.agentContactNumber && <p className="text-red-500 text-sm">{errors.agentContactNumber}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="agentEmail">Agent/Manager Email</label>
          <input
            type="email"
            id="agentEmail"
            name="agentEmail"
            value={formData.agentEmail}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.agentEmail ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.agentEmail && <p className="text-red-500 text-sm">{errors.agentEmail}</p>}
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Competition History:</h3>
      <div className="mb-4">
        <label className="block font-medium mb-2" htmlFor="competitionHistory">Competition History (List)</label>
        <textarea
          id="competitionHistory"
          name="competitionHistory"
          value={formData.competitionHistory}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.competitionHistory ? 'border-red-500' : 'border-gray-300'} rounded`}
        ></textarea>
        {errors.competitionHistory && <p className="text-red-500 text-sm">{errors.competitionHistory}</p>}
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Medical History:</h3>
      <div className="mb-4">
        <label className="block font-medium mb-2" htmlFor="medicalHistory">Medical History (List)</label>
        <textarea
          id="medicalHistory"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.medicalHistory ? 'border-red-500' : 'border-gray-300'} rounded`}
        ></textarea>
        {errors.medicalHistory && <p className="text-red-500 text-sm">{errors.medicalHistory}</p>}
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Doping Control and Biological Passport:</h3>
      <div className="mb-4">
        <label className="block font-medium mb-2" htmlFor="dopingControl">Doping Control Records</label>
        <textarea
          id="dopingControl"
          name="dopingControl"
          value={formData.dopingControl}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}
        ></textarea>
        {errors.dopingControl && <p className="text-red-500 text-sm">{errors.dopingControl}</p>}
      </div>

      <div>
        <label className="block font-medium mb-2">Previous Injuries</label>
        <input
          type="text"
          name="previousInjuries"
          value={formData.previousInjuries}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}
        />
        {errors.previousInjuries && <span>{errors.previousInjuries}</span>}
      </div>

      <div>
        <label className="block font-medium mb-2">Ranking</label>
        <input
          type="text"
          name="ranking"
          value={formData.ranking}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}

        />
        {errors.ranking && <span>{errors.ranking}</span>}
      </div>

      <div>
        <label className="block font-medium mb-2">Surgeries</label>
        <input
          type="text"
          name="surgeries"
          value={formData.surgeries}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}

        />
        {errors.surgeries && <span>{errors.surgeries}</span>}
      </div>

      <div>
        <label className="block font-medium mb-2">WADA Registration</label>
        <input
          type="text"
          name="wadaRegistration"
          value={formData.wadaRegistration}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}

        />
        {errors.wadaRegistration && <span>{errors.wadaRegistration}</span>}
      </div>

      <div>
        <label className="block font-medium mb-2">Medications</label>
        <input
          type="text"
          name="medications"
          value={formData.medications}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}

        />
        {errors.medications && <span>{errors.medications}</span>}
      </div>

      {/* {formData.testResults.map((result, index) => (
        <div key={index}>
          <h3>Test Result {index + 1}</h3>
          <label className="block font-medium mb-2">
            Type:
            <input
              type="text"
              name="type"
              value={result.type}
              onChange={(e) => handleTestResultChange(index, e)}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}

            />
          </label>
          {errors[`testResults.${index}.type`] && <p>{errors[`testResults.${index}.type`]}</p>}

          <label className="block font-medium mb-2">
            Result:
            <input
              type="text"
              name="result"
              value={result.result}
              onChange={(e) => handleTestResultChange(index, e)}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}

            />
          </label>
          {errors[`testResults.${index}.result`] && <p>{errors[`testResults.${index}.result`]}</p>}

          <label className="block font-medium mb-2">
            Authority:
            <input
              type="text"
              name="authority"
              value={result.authority}
              onChange={(e) => handleTestResultChange(index, e)}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}

            />
          </label>
          {errors[`testResults.${index}.authority`] && <p>{errors[`testResults.${index}.authority`]}</p>}
        </div>
      ))} */}

<div className='bg-white p-5 rounded-md'>
      <h2 className="text-xl font-bold mb-4">Test Results</h2>
      <div className="space-y-4">
        {formData.testResults.map((result, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded-md bg-gray-50">
            <h3 className="font-semibold mb-2">Test Result {index + 1}</h3>

            <label className="block font-medium mb-2">
              Date:
              <input
                type="date"
                name="date"
                value={result.date}
                onChange={(e) => handleTestResultChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>

            <label className="block font-medium mb-2">
              Type:
              <input
                type="text"
                name="type"
                value={result.type}
                onChange={(e) => handleTestResultChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>

            <label className="block font-medium mb-2">
              Result:
              <input
                type="text"
                name="result"
                value={result.result}
                onChange={(e) => handleTestResultChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>

            <label className="block font-medium mb-2">
              Authority:
              <input
                type="text"
                name="authority"
                value={result.authority}
                onChange={(e) => handleTestResultChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
          </div>
        ))}
        
        <button
          onClick={addTestResult}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Test Result
        </button>
      </div>
    </div>

      <div>
        <label className="block font-medium mb-2"> Allergies</label>
        <input
          type="text"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}

        />
        {errors.allergies && <span>{errors.allergies}</span>}
      </div>

      <div>
        <label className="block font-medium mb-2">Biological Passport Number</label>
        <input
          type="text"
          name="biologicalPassportNumber"
          value={formData.biologicalPassportNumber}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}

        />
        {errors.biologicalPassportNumber && <span>{errors.biologicalPassportNumber}</span>}
      </div>

      

      <div>
        <label className="block font-medium mb-2">Last Test Date</label>
        <input
          type="date"
          name="lastTestDate"
          value={formData.lastTestDate}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}

        />
        {errors.lastTestDate && <span>{errors.lastTestDate}</span>}
      </div>

      <div>
        <label className="block font-medium mb-2">Major Competitions</label>
        <input
          type="text"
          name="majorCompetitions"
          value={formData.majorCompetitions}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}

        />
        {errors.majorCompetitions && <span>{errors.majorCompetitions}</span>}
      </div>

      <div>
        <label className="block font-medium mb-2">Physician Contact Number</label>
        <input
          type="text"
          name="physicianContactNumber"
          value={formData.physicianContactNumber}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}

        />
        {errors.physicianContactNumber && <span>{errors.physicianContactNumber}</span>}
      </div>

      <div>
        <label className="block font-medium mb-2">Physician Email</label>
        <input
          type="email"
          name="physicianEmail"
          value={formData.physicianEmail}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}

        />
        {errors.physicianEmail && <span>{errors.physicianEmail}</span>}
      </div>

      <div>
        <label className="block font-medium mb-2">Physician Name</label>
        <input
          type="text"
          name="physicianName"
          value={formData.physicianName}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.dopingControl ? 'border-red-500' : 'border-gray-300'} rounded`}

        />
        {errors.physicianName && <span>{errors.physicianName}</span>}
      </div>

      


      <h3 className="text-lg font-semibold mt-6 mb-2">Medical Document Upload:</h3>
      <div className="mb-6">
            {medicalReports.map((medicalReport, index) => (
              <div key={index} className="mb-4">
                <input
                  type="file"
                  name={`medicalReport-${index}`}
                  onChange={(e) => medicalReportsChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  required
                />
                
              </div>
            ))}
            <button
              type="button"
              onClick={addMedicalReports}
              className="bg-green-600 text-white p-2 rounded hover:bg-green-500"
            >
              Add 
            </button>
          </div>

          {/* <div  className="mb-4">
                <input
                  type="file"
                  name='biologicalPassport'
                  onChange={(e) => biologicalPassportChange( e)}
                  className="w-full p-2 border border-gray-300 rounded"
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  required
                />
                
              </div> */}


<h3 className="text-lg font-semibold mt-6 mb-2">Consent and Declarations:</h3>
      
      <div className="mb-4">
        <label className="block font-medium mb-2 text-gray-700">
          By checking this box, I consent to undergo doping control testing as required by the relevant authorities.
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="consentTesting"
            checked={formData.consentTesting}
            onChange={handleChange}
            className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
          />
          <span className="text-gray-700">I consent for testing</span>
        </div>
        {errors.consentTesting && <span className="text-red-500 text-sm">{errors.consentTesting}</span>}
      </div>
      
      <div className="mb-4">
        <label className="block font-medium mb-2 text-gray-700">
          By checking this box, I declare that all the information I have provided is true and accurate to the best of my knowledge.
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="declaration"
            checked={formData.declaration}
            onChange={handleChange}
            className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
          />
          <span className="text-gray-700">I declare that the provided information is accurate</span>
        </div>
        {errors.declaration && <span className="text-red-500 text-sm">{errors.declaration}</span>}
      </div>
      

      {/* <div>
        <label>Digital Signature</label>
        <input
          type="text"
          name="digitalSignature"
          value={formData.digitalSignature}
          onChange={handleChange}
        />
        {errors.digitalSignature && <span>{errors.digitalSignature}</span>}
      </div> */}

      <div className="flex justify-between">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
</div>
  );
};

export default AthleteRegistrationForm;

