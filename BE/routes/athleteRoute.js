import { Router } from "express";
import multer, { diskStorage } from "multer";
import Athlete from "../model/athlete.js";

const router = Router();

// Set up multer for file uploads
const storage = diskStorage({
  destination: (req, file, cb) => {
   // Specify the upload directory for biological passports
     if (file.fieldname === "medicalReports") {
      cb(null, "uploads/athlete/medical_reports"); // Specify the upload directory for medical reports
    } else {
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

export default router;
