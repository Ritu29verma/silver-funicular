import { Router } from 'express';
import multer, { diskStorage } from 'multer';
import path from 'path';
import bcrypt from 'bcrypt'; 
import Investigator from '../model/investigator.js';
import jwt from 'jsonwebtoken'; 

const router = Router();

// Set up multer for file uploads
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/licenses'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Registration route
router.post('/register', upload.array('licenses'), async (req, res) => {
  const { fullName, password, dob, gender, nationality, idNumber, contactNumber, email, address, qualification, experience } = req.body;

  if (!fullName || !password || !dob || !gender || !nationality || !idNumber || !contactNumber || !email || !address || !qualification || !experience) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Handle file uploads
  const licenseFiles = req.files.map(file => file.path); 
  const hashedPassword = await bcrypt.hash(password, 10);

  const investigator = new Investigator({
    fullName,
    password: hashedPassword,
    dob,
    gender,
    nationality,
    idNumber,
    contactNumber,
    email,
    address,
    qualification,
    experience,
    licenses: licenseFiles, // save file paths in licenses
  });

  await investigator.save();
  console.log('Investigator registered:', investigator);

  res.status(201).json({ message: 'Investigator registered successfully!', investigator });
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const investigator = await Investigator.findOne({ email });

    if (!investigator) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, investigator.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate a token if you are using JWT for authentication
    const token = jwt.sign({ id: investigator._id, email: investigator.email }, 'your_jwt_secret', { expiresIn: '1h' }); // replace 'your_jwt_secret' with your actual secret

    res.status(200).json({ message: 'Login successful!', token, investigator });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
