import { Schema, model } from 'mongoose';

const InvestigatorSchema = new Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  nationality: { type: String, required: true },
  idNumber: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, required: true },
  licenses: [{ type: String }], // Store license file paths or identifiers
});

export default model('Investigator', InvestigatorSchema);
