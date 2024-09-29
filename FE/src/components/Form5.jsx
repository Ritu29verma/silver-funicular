import React from 'react';

const Form5 = ({ formData, handleChange, errors }) => {
  return (
    <div className='bg-white p-9 rounded-md'>
    <div className="space-y-4">
      <h2 className="text-xl font-bold"> Medications & Supplements</h2>

      <div>
        <label className="block font-medium mb-3" >List of Medications and Supplements</label>
        <textarea
          name="medicationsAndSupplements"
          value={formData.medicationsAndSupplements}
          onChange={(e) => handleChange(e, 'medicationsAndSupplements')}
          className="w-full border px-4 py-2 rounded"
          placeholder="List medications, supplements, inhalers, pain medications, etc., taken in the past 7 days."
        ></textarea>
        {errors.medicationsAndSupplements && (
          <p className="text-red-500">{errors.medicationsAndSupplements}</p>
        )}
      </div>

      <div>
          <label className="block font-medium mb-3">Enter Genetic Sequence</label>
          <input
            type="text"
            name="genSequence"
            value={formData.genSequence}
            onChange={(e) => handleChange(e, 'genSequence')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.genSequence && <p className="text-red-500">{errors.genSequence}</p>}
        </div>
    </div>
    </div>
  );
};

export default Form5;
