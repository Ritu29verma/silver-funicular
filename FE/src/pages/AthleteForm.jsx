import React, { useState } from 'react';

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
    biologicalPassportUpload: null,
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
      'digitalSignature',
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
    if (formData.testResults.length === 0) {
      newErrors.testResults = 'At least one test result is required';
    }
  
    // Check if medical reports are uploaded
    if (formData.medicalReports.length === 0) {
      newErrors.medicalReports = 'At least one medical report is required';
    }
  
    // Set errors and return
    return newErrors;
  };
  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: e.target.checked });
    } else if (type === 'file') {
      if (name === 'biologicalPassportUpload') {
        setFormData({ ...formData, biologicalPassportUpload: files[0] });
      } else {
        const updatedReports = [...formData.medicalReports];
        updatedReports.push(files[0]);
        setFormData({ ...formData, medicalReports: updatedReports });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Perform any necessary validation on the files if needed
    setFormData((prevData) => ({
      ...prevData,
      medicalDocuments: files,
    }));
  };

  const handleTestResultChange = (index, e) => {
    const updatedResults = [...formData.testResults];
    updatedResults[index][e.target.name] = e.target.value;
    setFormData({ ...formData, testResults: updatedResults });
  };

  const addTestResult = () => {
    setFormData({
      ...formData,
      testResults: [
        ...formData.testResults,
        { date: '', type: '', result: '', authority: '', upload: null },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form
    const newErrors = validateForm();
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      // No errors, handle form submission logic (API calls, etc.)
      console.log('Form Data Submitted:', formData);
      alert('Form submitted successfully!');
    } else {
      // Handle errors (UI feedback)
      alert('Please fix the errors before submitting.');
    }
  };
  


  return (
<div className='bg-gray-100'>
<form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold flex justify-center items-center mb-4">Athlete Registration Form</h2>
      
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

      {formData.testResults.map((result, index) => (
  <div key={index}>
    <label className="block text-gray-700">Test Result Date</label>
    <input
      type="date"
      name="date"
      value={result.date}
      onChange={(e) => handleTestResultChange(index, e)}
      className={`w-full px-4 py-2 border ${
        errors.testResults ? "border-red-500" : "border-gray-300"
      } rounded-md`}
    />
    {errors.testResults && <p className="text-red-500">{errors.testResults}</p>}
  </div>
))}
      <h3 className="text-lg font-semibold mt-6 mb-2">Medical Document Upload:</h3>
      <div className="mb-4">
        <label className="block font-medium mb-2" htmlFor="medicalDocuments">Upload Medical Documents (PDF/JPG)</label>
        <input
          type="file"
          id="medicalDocuments"
          name="medicalDocuments"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          multiple
          className={`w-full p-2 border ${errors.medicalDocuments ? 'border-red-500' : 'border-gray-300'} rounded`}
        />
         {errors.medicalDocuments && errors.medicalDocuments.length > 0 && (
          <p className="text-red-500 text-sm">{errors.medicalDocuments.join(", ")}</p>
        )}
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Consent and Declarations:</h3>
      <div className="mb-4">
        <label className="block font-medium mb-2" htmlFor="consent">Consent Declaration</label>
        <textarea
          id="consent"
          name="consent"
          value={formData.consent}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.consent ? 'border-red-500' : 'border-gray-300'} rounded`}
        ></textarea>
        {errors.consent && <p className="text-red-500 text-sm">{errors.consent}</p>}
      </div>

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

