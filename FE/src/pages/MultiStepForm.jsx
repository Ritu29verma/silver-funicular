import React, { useState } from 'react';
import Form1 from '../components/Form1';
import Form2 from '../components/Form2';
import Form3 from '../components/Form3';
import Form4 from '../components/Form4';
import Form5 from '../components/Form5';
import Form6 from '../components/Form6';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const athleteId = query.get('athleteId');

  const navigate = useNavigate();

  useEffect(() => {
    if (athleteId) {
      setFormData((prevData) => ({
        ...prevData,
        athleteId, // Assuming you want to store it in formData
      }));
    }
  }, [athleteId]);

  const [formData, setFormData] = useState({
    // athleteId: athleteId || '',
    physicalCheckupDetails: {
      height: '',
      weight: '',
      systolic: '',
      diastolic: '',
      heartRate: '',
      temperature: '',
      respiratoryRate: '',
      visualInspection: '',
      remarks: '',
    },
    dopingTestDetails: [
        {
          testType: '',
          testDate: '',
          testLocation: '',
          sampleID: '',
          result: '',
          remarks: '',
          substanceDetected: [],
        },
      ],
    analysisDetails: {
      inCompetition: false,
      outOfCompetition: false,
      dateOfLastCompetition: '',
      sampleCollectionDate: '',
      sampleCollectionTime: '',
      sportDiscipline: '',
      gender: '',
      sampleCodeNumber: '',
      testingOfficerCode: '',
      sampleAB: false,
      partialSampleDetails: [],
    },
    medicationsSupplements: '',
    genSequence : '',
    investigationDetails: {
      investigatorName: '',
      dateOfInvestigation: '',
      locationOfInvestigation: '',
      investigationStatus: '',
      notes: '',
    },
  });
 
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNestedChange = (e, section, field) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleDopingTestChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedDetails = [...prevData.dopingTestDetails];
      updatedDetails[index] = { ...updatedDetails[index], [field]: value };
      return {
        ...prevData,
        dopingTestDetails: updatedDetails,
      };
    });
  };


    // Handle adding another doping test details form
    const handleAddAnother = () => {
        setFormData((prevData) => ({
          ...prevData,
          dopingTestDetails: [
            ...prevData.dopingTestDetails,
            { testType: '', testDate: '', testLocation: '', sampleID: '', result: '', remarks: '' },
          ],
        }));
      };

  // Render the appropriate form component
  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <Form1 formData={formData} handleChange={handleNestedChange} errors={errors} />;
      case 2:
        return <Form2 formData={formData} setFormData={setFormData} />;
    
      case 3:
        return <Form4 formData={formData} handleChange={handleNestedChange} errors={errors} />;
      case 4:
        return <Form5 formData={formData} handleChange={handleChange} errors={errors} />;
      case 5:
        return <Form6 formData={formData} handleChange={handleNestedChange} errors={errors} />;
      default:
        return null;
    }
  };

 
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/doping-form/submit-form', formData);
      console.log(response.data.message);

      navigate('/');
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };
  
  const validateForm1 = () => {
    const newErrors = {};

    if (!formData.physicalCheckupDetails.height) newErrors.height = 'Height is required.';
    if (!formData.physicalCheckupDetails.weight) newErrors.weight = 'Weight is required.';
    if (! formData.physicalCheckupDetails.systolic) newErrors.systolic = 'Systolic value is required.';
    if (! formData.physicalCheckupDetails.diastolic) newErrors.diastolic = 'Diastolic value is required.';
    if (!formData.physicalCheckupDetails.heartRate) newErrors.heartRate = 'Heart rate is required.';
    if (!formData.physicalCheckupDetails.temperature) newErrors.temperature = 'Body temperature is required.';
    if (!formData.physicalCheckupDetails.respiratoryRate) newErrors.respiratoryRate = 'Respiratory rate is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };


  const validateForm4 = () => { 
    const newErrors = {};
  
    if (!formData.inCompetition && !formData.outOfCompetition) {
      newErrors.competitionType = 'You must select In Competition or Out of Competition.';
    }
  
    if (!formData.lastCompetitionDate) newErrors.lastCompetitionDate = 'Date of last competition is required.';
    if (!formData.sampleCollectionDate) newErrors.sampleCollectionDate = 'Sample collection date is required.';
    if (!formData.sampleCollectionTime) newErrors.sampleCollectionTime = 'Sample collection time is required.';
    if (!formData.sportDiscipline) newErrors.sportDiscipline = 'Sport discipline is required.';
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    if (!formData.sampleCodeNumber) newErrors.sampleCodeNumber = 'Sample code number is required.';
    if (!formData.testingOfficerCode) newErrors.testingOfficerCode = 'Testing officer code is required.';
  
    return newErrors;
  };
  
  const validateForm5 = () => { 
    const newErrors = {};
  
    if (!formData.medicationsSupplements || formData.medicationsSupplements.length === 0) {
      newErrors.medicationsSupplements = 'Please provide information on medications or supplements taken.';
    }
    if (!formData. genSequence) newErrors. genSequence = ' genSequence is required.';
    return newErrors;
  };
  
  const validateForm6 = () => { 
    const newErrors = {};
  
    if (!formData.investigatorName) newErrors.investigatorName = 'Investigator name is required.';
    if (!formData.dateOfInvestigation) newErrors.dateOfInvestigation = 'Date of investigation is required.';
    if (!formData.locationOfInvestigation) newErrors.locationOfInvestigation = 'Location of investigation is required.';

  
    return newErrors;
  };
  

  const nextStep = () => {
    let isValid = true; // By default, we can assume it's valid
  
    switch (currentStep) {
      case 1:
        isValid = validateForm1();
        break;
      // No validation for Form2, just proceed to the next step
    //   case 3:
    //     isValid = validateForm3();
    //     break;
      case 4:
        isValid = validateForm4();
        break;
      case 5:
        isValid = validateForm5();
        break;
      case 6:
        isValid = validateForm6();
        break;
      default:
        isValid = true;
    }
  
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };


  return (
  <div className='bg-gray-100 min-h-screen w-full'>
      <div className="max-w-4xl mx-auto  p-8">
      <h1 className="text-2xl font-bold mb-4 bg-white p-5 flex items-center justify-center rounded-lg">Doping Verification Form</h1>
      {renderForm()}
      <div className="flex justify-between mt-4">
        {currentStep > 1 && (
          <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">
            Previous
          </button>
        )}
        {currentStep < 5 && (
          <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
            Next
          </button>
        )}
        {currentStep === 5 && (
          <button 
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded "
          >
            Predict
          </button>
        )}
      </div>
    </div>
  </div>
  );
};

export default MultiStepForm;