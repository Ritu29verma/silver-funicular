import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const InvestigatorForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    dob: '',
    gender: '',
    nationality: '',
    idNumber: '',
    contactNumber: '',
    email: '',
    address: '',
    qualification: '',
    experience: '',
    licenses: [],
  });

  const [errors, setErrors] = useState({});
  const [licenseFiles, setLicenseFiles] = useState([{ file: null }]);

  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLicenseFileChange = (index, e) => {
    const newLicenseFiles = [...licenseFiles];
    newLicenseFiles[index].file = e.target.files[0];
    setLicenseFiles(newLicenseFiles);
  };

  const addLicenseField = () => {
    setLicenseFiles([...licenseFiles, { file: null }]);
  };

  const removeLicenseField = (index) => {
    const newLicenseFiles = licenseFiles.filter((_, i) => i !== index);
    setLicenseFiles(newLicenseFiles);
  };
  
  // Validation function to check for empty fields
  const validate = () => {
    let errors = {};

    // Check for required fields
    if (!formData.fullName) errors.fullName = "Full Name is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.dob) errors.dob = "Date of Birth is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.nationality) errors.nationality = "Nationality is required";
    if (!formData.idNumber) errors.idNumber = "Aadhar/ID Number is required";
    if (!formData.contactNumber) errors.contactNumber = "Contact Number is required";
    if (!formData.email) errors.email = "Email Address is required";
    if (!formData.address) errors.address = "Residential Address is required";
    if (!formData.qualification) errors.qualification = "Qualification is required";
    if (!formData.experience) errors.experience = "Experience is required";

    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const validationErrors = validate();
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('fullName', formData.fullName);
    formDataToSubmit.append('password', formData.password);
    formDataToSubmit.append('dob', formData.dob);
    formDataToSubmit.append('gender', formData.gender);
    formDataToSubmit.append('nationality', formData.nationality);
    formDataToSubmit.append('idNumber', formData.idNumber);
    formDataToSubmit.append('contactNumber', formData.contactNumber);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('address', formData.address);
    formDataToSubmit.append('qualification', formData.qualification);
    formDataToSubmit.append('experience', formData.experience);
    
    // Append license files
    licenseFiles.forEach((license) => {
      if (license.file) {
        formDataToSubmit.append('licenses', license.file);
      }
    });
  
    // Submit form data using Axios
    axios.post('http://localhost:5000/api/investigators/register', formDataToSubmit)
      .then(response => {
        console.log(response.data);
        alert('Form submitted successfully!');
        navigate('/login');
        // Reset form here if needed
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Investigator Registration Form</h2>

        <form onSubmit={handleSubmit}>
          {/* Personal Details Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="mb-4">
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

    {/* Contact Number */}
    <div className="mb-4">
                <label className="block font-medium mb-2" htmlFor="contactNumber">Contact Number</label>
                <input
                  type="number"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                />
                {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
              </div>
           

              {/* Date of Birth */}
              <div className="mb-4">
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

              {/* Gender */}
              <div className="mb-4">
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

              {/* Nationality */}
              <div className="mb-4">
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

              {/* Aadhar/ID Number */}
              <div className="mb-4">
                <label className="block font-medium mb-2" htmlFor="idNumber">Aadhar/ID Number</label>
                <input
                  type="number"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.idNumber ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                />
                {errors.idNumber && <p className="text-red-500 text-sm">{errors.idNumber}</p>}
              </div>

          

              {/* Email Address */}
              <div className="mb-4">
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

                 
              {/* Password */}
              <div className="mb-4">
                <label className="block font-medium mb-2" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              {/* Residential Address */}
              <div className="mb-4 md:col-span-2">
                <label className="block font-medium mb-2" htmlFor="address">Residential Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Professional Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Qualification */}
              <div className="mb-4">
                <label className="block font-medium mb-2" htmlFor="qualification">Qualification</label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.qualification ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                />
                {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
              </div>

              {/* Experience */}
              <div className="mb-4">
                <label className="block font-medium mb-2" htmlFor="experience">Experience (Years)</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.experience ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                />
                {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
              </div>

              {/* License/Certification */}
              <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">License/Certification</h3>
            {licenseFiles.map((license, index) => (
              <div key={index} className="mb-4">
                <input
                  type="file"
                  name={`license-${index}`}
                  onChange={(e) => handleLicenseFileChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeLicenseField(index)}
                  className="text-red-600 text-sm mt-1"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLicenseField}
              className="bg-green-600 text-white p-2 rounded hover:bg-green-500"
            >
              Add Another License/Certification
            </button>
          </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg w-full mt-4 hover:bg-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvestigatorForm;
