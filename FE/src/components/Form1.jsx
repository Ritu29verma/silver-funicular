import React from 'react';

const Form1 = ({ formData, handleChange, errors }) => {

      
  return (
  <div className='bg-white p-5 rounded-md'>
      <div className="space-y-4 ">
      <h2 className="text-xl font-bold"> Physical Checkup Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-2" >Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.physicalCheckupDetails.height || ''}
            onChange={(e) => handleChange(e, 'physicalCheckupDetails', 'height')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.height && <p className="text-red-500">{errors.height}</p>}
        </div>
        <div>
          <label className="block font-medium mb-2" >Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.physicalCheckupDetails.weight}
            onChange={(e) => handleChange(e, 'physicalCheckupDetails', 'weight')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.weight && <p className="text-red-500">{errors.weight}</p>}
        </div>
        <div>
            <label className="block font-medium mb-2">Systolic (mmHg)</label>
            <input
              type="number"
              name="systolic"
              value={formData.physicalCheckupDetails.systolic}
              onChange={(e) => handleChange(e, 'physicalCheckupDetails', 'systolic')}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.systolic && <p className="text-red-500">{errors.systolic}</p>}
          </div>
          <div>
            <label className="block font-medium mb-2">Diastolic (mmHg)</label>
            <input
              type="number"
              name="diastolic"
              value={formData.physicalCheckupDetails.diastolic}
              onChange={(e) => handleChange(e, 'physicalCheckupDetails', 'diastolic')}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.diastolic && <p className="text-red-500">{errors.diastolic}</p>}
          </div>
        <div>
          <label className="block font-medium mb-2" >Heart Rate (bpm)</label>
          <input
            type="number"
            name="heartRate"
            value={formData.physicalCheckupDetails.heartRate}
            onChange={(e) => handleChange(e, 'physicalCheckupDetails', 'heartRate')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.heartRate && <p className="text-red-500">{errors.heartRate}</p>}
        </div>
        <div>
          <label className="block font-medium mb-2" >Temperature (°C)</label>
          <input
            type="number"
            name="temperature"
            value={formData.physicalCheckupDetails.temperature}
            onChange={(e) => handleChange(e, 'physicalCheckupDetails', 'temperature')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.temperature && <p className="text-red-500">{errors.temperature}</p>}
        </div>
        <div>
          <label className="block font-medium mb-2" >Respiratory Rate (breaths/min)</label>
          <input
            type="number"
            name="respiratoryRate"
            value={formData.physicalCheckupDetails.respiratoryRate}
            onChange={(e) => handleChange(e, 'physicalCheckupDetails', 'respiratoryRate')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.respiratoryRate && <p className="text-red-500">{errors.respiratoryRate}</p>}
        </div>
        <div>
          <label className="block font-medium mb-2" >Visual Inspection Observations</label>
          <textarea
            name="visualInspection"
            value={formData.physicalCheckupDetails.visualInspection}
            onChange={(e) => handleChange(e, 'physicalCheckupDetails', 'visualInspection')}
            className="w-full border px-4 py-2 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium mb-2" >Remarks</label>
          <textarea
            name="remarks"
            value={formData.physicalCheckupDetails.remarks}
            onChange={(e) => handleChange(e, 'physicalCheckupDetails', 'remarks')}
            className="w-full border px-4 py-2 rounded"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Form1;
