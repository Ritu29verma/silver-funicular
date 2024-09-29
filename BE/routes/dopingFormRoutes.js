
import { Router } from 'express';
const router = Router();
import DopingForm from '../model/dopingForm.js';

router.post('/submit-form', async (req, res) => {
  try {
    const formData = req.body;

    // Convert checkbox values
    formData.analysisDetails.inCompetition = formData.analysisDetails.inCompetition === 'on';
    formData.analysisDetails.outOfCompetition = formData.analysisDetails.outOfCompetition === 'on';

    // Create and save the doping form to the database
    const newDopingForm = new DopingForm(formData);
    await newDopingForm.save();

    res.status(201).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Failed to save form data.', error });
  }
});

export default router;
