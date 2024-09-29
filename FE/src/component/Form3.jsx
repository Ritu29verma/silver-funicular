
import React from 'react';

const Form3 = ({ formData, setFormData, errors }) => {
  const handleSubstanceChange = (index, e) => {
    const updatedSubstances = [...formData.dopingTestDetails.substanceDetected];
    updatedSubstances[index][e.target.name] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      dopingTestDetails: {
        ...prevData.dopingTestDetails,
        substanceDetected: updatedSubstances,
      },
    }));
  };

  const addSubstance = () => {
    setFormData((prevData) => ({
      ...prevData,
      dopingTestDetails: {
        ...prevData.dopingTestDetails,
        substanceDetected: [
          ...prevData.dopingTestDetails.substanceDetected,
          { substanceName: '', substanceCategory: '', concentration: '', detectionMethod: '' },
        ],
      },
    }));
  };

  return (
    <div className='bg-white p-5 rounded-md'>
    <div className="space-y-4">
      <h2 className="text-xl font-bold"> Substance Detected</h2>

      {formData.dopingTestDetails.substanceDetected.map((substance, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2" >Substance Name</label>
            <input
              type="text"
              name="substanceName"
              value={substance.substanceName}
              onChange={(e) => handleSubstanceChange(index, e)}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.substanceName && <p className="text-red-500">{errors.substanceName}</p>}
          </div>
          <div>
            <label className="block font-medium mb-2" >Substance Category</label>
            <input
              type="text"
              name="substanceCategory"
              value={substance.substanceCategory}
              onChange={(e) => handleSubstanceChange(index, e)}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.substanceCategory && <p className="text-red-500">{errors.substanceCategory}</p>}
          </div>
          <div>
            <label className="block font-medium mb-2" >Concentration Detected (ng/ml)</label>
            <input
              type="number"
              name="concentration"
              value={substance.concentration}
              onChange={(e) => handleSubstanceChange(index, e)}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.concentration && <p className="text-red-500">{errors.concentration}</p>}
          </div>
          <div>
            <label className="block font-medium mb-2" >Method of Detection</label>
            <input
              type="text"
              name="detectionMethod"
              value={substance.detectionMethod}
              onChange={(e) => handleSubstanceChange(index, e)}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.detectionMethod && <p className="text-red-500">{errors.detectionMethod}</p>}
          </div>
        </div>
      ))}

      <button onClick={addSubstance} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Add Substance
      </button>
    </div>
    </div>
  );
};

export default Form3;
