import React from 'react';

const Form2 = ({ formData, setFormData }) => {
    const addTest = () => {
        setFormData((prevState) => ({
          ...prevState,
          dopingTestDetails: [
            ...prevState.dopingTestDetails,
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
        }));
      };

      const handleTestChange = (e, field, index) => {
        const { value } = e.target;
        setFormData((prevState) => {
          const updatedTests = [...prevState.dopingTestDetails];
          updatedTests[index][field] = value;
          return { ...prevState, dopingTestDetails: updatedTests };
        });
      };

      const handleSubstanceChange = (testIndex, substanceIndex, e) => {
        const updatedSubstances = [...formData.dopingTestDetails[testIndex].substanceDetected];
        updatedSubstances[substanceIndex][e.target.name] = e.target.value;
        setFormData((prevData) => {
          const updatedTests = [...prevData.dopingTestDetails];
          updatedTests[testIndex].substanceDetected = updatedSubstances;
          return { ...prevData, dopingTestDetails: updatedTests };
        });
      };
      const addSubstance = (index) => {
        setFormData((prevData) => {
          const updatedTests = [...prevData.dopingTestDetails];
          updatedTests[index] = {
            ...updatedTests[index],
            substanceDetected: [
              ...updatedTests[index].substanceDetected,
              {
                substanceName: '',
                substanceCategory: '',
                concentration: '',
                detectionMethod: '',
              },
            ],
          };
          return { ...prevData, dopingTestDetails: updatedTests };
        });
      };

  const handleChange = (e, field, index) => {
    const { value } = e.target;
    setFormData((prevState) => {
      const updatedTests = [...prevState.dopingTestDetails];
      updatedTests[index][field] = value;
      return { ...prevState, dopingTestDetails: updatedTests };
    });
  };

  return (
    <div className='bg-white p-5 rounded-md'>
      <h2 className="text-xl font-bold mb-4">Doping Test Details</h2>
      <div className="space-y-4">
        {formData.dopingTestDetails.map((test, testIndex) => (
          <div key={testIndex} className="p-4 border border-gray-300 rounded-md bg-gray-50">
            <h3 className="font-semibold bg-[#12372A] text-white p-4 mt-4 mb-4">Test {testIndex + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Type of Test</label>
                <select
                  name={`testType-${testIndex}`}
                  value={test.testType}
                  onChange={(e) => handleTestChange(e, 'testType', testIndex)}
                  className="w-full border px-4 py-2 rounded"
                >
                  <option value="">Select</option>
                  <option value="Urine">Urine</option>
                  <option value="Blood">Blood</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2">Date of Test</label>
                <input
                  type="date"
                  name={`testDate-${testIndex}`}
                  value={test.testDate}
                  onChange={(e) => handleTestChange(e, 'testDate', testIndex)}
                  className="w-full border px-4 py-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Test Location</label>
                <input
                  type="text"
                  name={`testLocation-${testIndex}`}
                  value={test.testLocation}
                  onChange={(e) => handleTestChange(e, 'testLocation', testIndex)}
                  className="w-full border px-4 py-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Sample ID</label>
                <input
                  type="text"
                  name={`sampleID-${testIndex}`}
                  value={test.sampleID}
                  onChange={(e) => handleTestChange(e, 'sampleID', testIndex)}
                  className="w-full border px-4 py-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Test Result</label>
                <select
                  name={`result-${testIndex}`}
                  value={test.result}
                  onChange={(e) => handleTestChange(e, 'result', testIndex)}
                  className="w-full border px-4 py-2 rounded"
                >
                  <option value="">Select</option>
                  <option value="Positive">Positive</option>
                  <option value="Negative">Negative</option>
                  <option value="Inconclusive">Inconclusive</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2">Remarks</label>
                <textarea
                  name={`remarks-${testIndex}`}
                  value={test.remarks}
                  onChange={(e) => handleTestChange(e, 'remarks', testIndex)}
                  className="w-full border px-4 py-2 rounded"
                />
              </div>
            </div>

            <h4 className="font-semibold bg-[#12372A] text-white p-4 mt-4 mb-4">Substances Detected</h4>
            {test.substanceDetected.map((substance, substanceIndex) => (
                            <div
                                key={substanceIndex}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4 mb-4"
                            >
                                <div>
                                    <label className="block font-medium mb-2">Substance Name</label>
                                    <input
                                        type="text"
                                        name="substanceName"
                                        value={substance.substanceName}
                                        onChange={(e) => handleSubstanceChange(testIndex, substanceIndex, e)}
                                        className="w-full border px-4 py-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-2">Substance Category</label>
                                    <input
                                        type="text"
                                        name="substanceCategory"
                                        value={substance.substanceCategory}
                                        onChange={(e) => handleSubstanceChange(testIndex, substanceIndex, e)}
                                        className="w-full border px-4 py-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-2">Concentration Detected (ng/ml)</label>
                                    <input
                                        type="number"
                                        name="concentration"
                                        value={substance.concentration}
                                        onChange={(e) => handleSubstanceChange(testIndex, substanceIndex, e)}
                                        className="w-full border px-4 py-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-2">Method of Detection</label>
                                    <input
                                        type="text"
                                        name="detectionMethod"
                                        value={substance.detectionMethod}
                                        onChange={(e) => handleSubstanceChange(testIndex, substanceIndex, e)}
                                        className="w-full border px-4 py-2 rounded"
                                    />
                                </div>
                            </div>
                        ))}

            <button onClick={() => addSubstance(testIndex)} className="bg-[#12372A] text-white px-4 py-2 rounded mt-2">
              Add Substance
            </button>
          </div>
        ))}
        <button onClick={addTest} className="mt-4 px-4 py-2 bg-[#12372A] text-white rounded">
          Add Doping Test
        </button>
      </div>
    </div>
  );
};
export default Form2;
