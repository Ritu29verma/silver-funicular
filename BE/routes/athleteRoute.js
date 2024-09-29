import { Router } from "express";
import multer, { diskStorage } from "multer";
import Athlete from "../model/athlete.js";

const router = Router();

// Set up multer for file uploads
const storage = diskStorage({
  destination: (req, file, cb) => {
     if (file.fieldname === "medicalReports") {
      cb(null, "uploads/athlete/medical_reports"); 
      cb(new Error("Invalid file field name"), null);
    }
  },
  filename: (req, file, cb) => {
    const prefix = file.fieldname ===  "medical-report";
    cb(null, `${Date.now()}-${prefix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create a new athlete
router.post(
  "/register",
  upload.fields([
    { name: "medicalReports" },
  ]),
  async (req, res) => {
    try {
      const {
        fullName,
        dob,
        gender,
        nationality,
        sport,
        category,
        teamClubName,
        athleteId,
        passportId,
        contactNumber,
        email,
        residentialAddress,
        emergencyContactName,
        emergencyContactNumber,
        coachName,
        coachContactNumber,
        coachEmail,
        agentName,
        agentContactNumber,
        agentEmail,
        majorCompetitions,
        ranking,
        previousInjuries,
        surgeries,
        chronicConditions,
        medications,
        allergies,
        physicianName,
        physicianContactNumber,
        physicianEmail,
        wadaRegistration,
        biologicalPassportNumber,
        lastTestDate,
        testResults,
        consentTesting,
        declaration,
        digitalSignature,
      } = req.body;

      console.log(req.body);

    //   const biologicalPassportFile = req.files['biologicalPassport'] ? req.files['biologicalPassport'][0].path : null;
      const medicalReportsFiles = req.files['medicalReports'] ? req.files['medicalReports'].map(file => file.path) : [];

      const athlete = new Athlete({
        fullName,
        dob,
        gender,
        nationality,
        sport,
        category,
        teamClubName,
        athleteId,
        passportId,
        contactNumber,
        email,
        residentialAddress,
        emergencyContactName,
        emergencyContactNumber,
        coachName,
        coachContactNumber,
        coachEmail,
        agentName,
        agentContactNumber,
        agentEmail,
        majorCompetitions,
        ranking,
        previousInjuries,
        surgeries,
        chronicConditions,
        medications,
        allergies,
        physicianName,
        physicianContactNumber,
        physicianEmail,
        wadaRegistration,
        biologicalPassportNumber,
        lastTestDate,
        testResults,
        // biologicalPassport: biologicalPassportFile, // Save the file path for the biological passport
        medicalReports: medicalReportsFiles, 
        consentTesting: consentTesting === "true",
        declaration: declaration === "true",
        digitalSignature,
      });

      console.log(athlete);

      await athlete.save();
      res.status(201).json({ message: "Athlete registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error, please try again later" });
    }
  }
);

router.get("/allAthletes", async (req, res) => {
  try {
    const athletes = await Athlete.find(); // Fetch all athletes
    res.status(200).json(athletes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

// Route to get an athlete by athleteId
router.get("/allAthletes/:athleteId", async (req, res) => {
  const { athleteId } = req.params;
  
  try {
    const athlete = await Athlete.findOne({ athleteId }); // Fetch the athlete by athleteId
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }
    res.status(200).json(athlete);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

export default router;








