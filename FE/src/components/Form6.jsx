import React from 'react';

const Form6 = ({ formData, handleChange, errors }) => {
  return (
    <div className='bg-white p-5 rounded-md'>
    <div className="space-y-4">
      <h2 className="text-xl font-bold"> Investigation Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Investigator's Name</label>
          <input
            type="text"
            name="investigatorName"
            value={formData.investigationDetails.investigatorName}
            onChange={(e) => handleChange(e, 'investigationDetails', 'investigatorName')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.investigatorName && <p className="text-red-500">{errors.investigatorName}</p>}
        </div>

        <div>
          <label>Date of Investigation</label>
          <input
            type="date"
            name="dateOfInvestigation"
            value={formData.investigationDetails.dateOfInvestigation}
            onChange={(e) => handleChange(e, 'investigationDetails', 'dateOfInvestigation')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.dateOfInvestigation && <p className="text-red-500">{errors.dateOfInvestigation}</p>}
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            name="locationOfInvestigation"
            value={formData.investigationDetails.locationOfInvestigation}
            onChange={(e) => handleChange(e, 'investigationDetails', 'locationOfInvestigation')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.locationOfInvestigation && <p className="text-red-500">{errors.locationOfInvestigation}</p>}
        </div>

        <div>
          <label>Status of Investigation</label>
          <select
            name="investigationStatus"
            value={formData.investigationDetails.investigationStatus}
            onChange={(e) => handleChange(e, 'investigationDetails', 'investigationStatus')}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.investigationStatus && <p className="text-red-500">{errors.investigationStatus}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2" >Additional Notes</label>
          <textarea
            name="notes"
            value={formData.investigationDetails.notes}
            onChange={(e) => handleChange(e, 'investigationDetails', 'notes')}
            className="w-full border px-4 py-2 rounded"
          ></textarea>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Form6;
