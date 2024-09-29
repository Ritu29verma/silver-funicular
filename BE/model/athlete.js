import { Schema, model } from 'mongoose';

const testResultSchema = new Schema({
  date: { type: Date },
  type: { type: String, required: true },
  result: { type: String, required: true },
  authority: { type: String, required: true },
  upload: { type: String },
});

const athleteSchema = new Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  nationality: { type: String, required: true },
  sport: { type: String, required: true },
  category: { type: String, required: true },
  teamClubName: { type: String, required: true },
  athleteId: { type: String, required: true,unique:true },
  passportId: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  residentialAddress: { type: String, required: true },
  emergencyContactName: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  coachName: { type: String, required: true },
  coachContactNumber: { type: String, required: true },
  coachEmail: { type: String, required: true },
  agentName: { type: String, required: true },
  agentContactNumber: { type: String, required: true },
  agentEmail: { type: String, required: true },
  majorCompetitions: { type: String, required: true },
  ranking: { type: String, required: true },
  previousInjuries: { type: String, required: true },
  surgeries: { type: String, required: true },
  chronicConditions: { type: [String] },
  medications: { type: String, required: true },
  allergies: { type: String, required: true },
  physicianName: { type: String, required: true },
  physicianContactNumber: { type: String, required: true },
  physicianEmail: { type: String, required: true },
  wadaRegistration: { type: String, required: true },
  biologicalPassportNumber: { type: String, required: true },
  biologicalPassport: { type: String },
  lastTestDate: { type: Date },
  testResults: [testResultSchema],
  medicalReports: [{ type: String }],
  consentTesting: { type: Boolean, required: true },
  declaration: { type: Boolean, required: true },
  digitalSignature: { type: String },
});

const Athlete = model('Athlete', athleteSchema);

export default Athlete;
