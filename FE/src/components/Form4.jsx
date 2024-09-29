import React from 'react';

const Form4 = ({ formData, handleChange, errors, setFormData }) => {

  const handleCompetitionChange = (field) => {
    setFormData((prevState) => {
      const newState = { ...prevState };
  
      // Toggle the current checkbox
      if (field === 'inCompetition') {
        newState.analysisDetails.inCompetition = !prevState.analysisDetails.inCompetition;
        if (newState.analysisDetails.inCompetition) {
          newState.analysisDetails.outOfCompetition = false; // Deselect the other checkbox
        }
      } else if (field === 'outOfCompetition') {
        newState.analysisDetails.outOfCompetition = !prevState.analysisDetails.outOfCompetition;
        if (newState.analysisDetails.outOfCompetition) {
          newState.analysisDetails.inCompetition = false; // Deselect the other checkbox
        }
      }
  
      return newState;
    });
  };

  
  return (
    <div className='bg-white p-5 rounded-md'>
    <div className="space-y-4">
      <h2 className="text-xl font-bold"> Information for Analysis</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
  <label className="flex items-center space-x-3 mb-2">
    <input
      type="checkbox"
      name="inCompetition"
      checked={formData.analysisDetails.inCompetition}
      onChange={() => handleCompetitionChange('inCompetition')}
      className="w-5 h-5 text-[#12372A] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#12372A] focus:outline-none transition duration-300 ease-in-out"
    />
    <span className="text-sm md:text-base font-medium text-gray-700">In Competition</span>
  </label>
</div>

<div>
  <label className="flex items-center space-x-3 mb-2">
    <input
      type="checkbox"
      name="outOfCompetition"
      checked={formData.analysisDetails.outOfCompetition}
      onChange={() => handleCompetitionChange('outOfCompetition')}
      className="w-5 h-5 text-[#12372A] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#12372A] focus:outline-none transition duration-300 ease-in-out"
    />
    <span className="text-sm md:text-base font-medium text-gray-700">Out of Competition</span>
  </label>
</div>


        <div>
          <label className="block font-medium mb-2" >Date of Last Competition</label>
          <input
            type="date"
            name="dateOfLastCompetition"
            value={formData.analysisDetails.dateOfLastCompetition}
            onChange={(e) => handleChange(e, 'analysisDetails', 'dateOfLastCompetition')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.dateOfLastCompetition && <p className="text-red-500">{errors.dateOfLastCompetition}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" >Sample Collection Date</label>
          <input
            type="date"
            name="sampleCollectionDate"
            value={formData.analysisDetails.sampleCollectionDate}
            onChange={(e) => handleChange(e, 'analysisDetails', 'sampleCollectionDate')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.sampleCollectionDate && <p className="text-red-500">{errors.sampleCollectionDate}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" >Sample Collection Time</label>
          <input
            type="time"
            name="sampleCollectionTime"
            value={formData.analysisDetails.sampleCollectionTime}
            onChange={(e) => handleChange(e, 'analysisDetails', 'sampleCollectionTime')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.sampleCollectionTime && <p className="text-red-500">{errors.sampleCollectionTime}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" >Sport Discipline</label>
          <input
            type="text"
            name="sportDiscipline"
            value={formData.analysisDetails.sportDiscipline}
            onChange={(e) => handleChange(e, 'analysisDetails', 'sportDiscipline')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.sportDiscipline && <p className="text-red-500">{errors.sportDiscipline}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" >Gender</label>
          <select
            name="gender"
            value={formData.analysisDetails.gender}
            onChange={(e) => handleChange(e, 'analysisDetails', 'gender')}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500">{errors.gender}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" >Sample Code Number</label>
          <input
            type="text"
            name="sampleCodeNumber"
            value={formData.analysisDetails.sampleCodeNumber}
            onChange={(e) => handleChange(e, 'analysisDetails', 'sampleCodeNumber')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.sampleCodeNumber && <p className="text-red-500">{errors.sampleCodeNumber}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" >Testing Officer Code</label>
          <input
            type="text"
            name="testingOfficerCode"
            value={formData.analysisDetails.testingOfficerCode}
            onChange={(e) => handleChange(e, 'analysisDetails', 'testingOfficerCode')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.testingOfficerCode && <p className="text-red-500">{errors.testingOfficerCode}</p>}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Form4;
