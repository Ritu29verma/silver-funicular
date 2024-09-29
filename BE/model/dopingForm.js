import { Schema, model } from 'mongoose';

const dopingFormSchema = new Schema({
    athleteId: { type: String, required: true },
  physicalCheckupDetails: {
    height: { type: String, required: true },
    weight: { type: String, required: true },
    systolic: { type: String, required: true },
    diastolic: { type: String, required: true },
    heartRate: { type: String, required: true },
    temperature: { type: String, required: true },
    respiratoryRate: { type: String, required: true },
    visualInspection: { type: String },
    remarks: { type: String },
  },
  dopingTestDetails: [{
    testType: { type: String },
    testDate: { type: Date },
    testLocation: { type: String },
    sampleID: { type: String },
    result: { type: String },
    remarks: { type: String },
    substanceDetected: [{
      substanceName: { type: String },
      substanceCategory: { type: String },
      concentration: { type: String },
      detectionMethod: { type: String }
    }],
  }],
  analysisDetails: {
    inCompetition: { type: Boolean },
    outOfCompetition: { type: Boolean },
    dateOfLastCompetition: { type: Date },
    sampleCollectionDate: { type: Date },
    sampleCollectionTime: { type: String },
    sportDiscipline: { type: String },
    gender: { type: String },
    sampleCodeNumber: { type: String },
    testingOfficerCode: { type: String },
    sampleAB: { type: Boolean },
    partialSampleDetails: [{ type: String }],
  },
  medicationsSupplements: { type: String },
  genSequence: { type: String },
  investigationDetails: {
    investigatorName: { type: String },
    dateOfInvestigation: { type: Date },
    locationOfInvestigation: { type: String },
    investigationStatus: { type: String },
    notes: { type: String },
  },
});

export default model('DopingForm', dopingFormSchema);
