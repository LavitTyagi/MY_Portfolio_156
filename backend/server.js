require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
const allowedOrigins = (process.env.CLIENT_ORIGINS || '').split(',').map(x => x.trim()).filter(Boolean);
app.use(cors({ origin(origin, callback) { if (!origin || allowedOrigins.includes(origin)) return callback(null, true); return callback(new Error('Origin is not allowed by CORS')); } }));
app.use(express.json({ limit: '100kb' }));
app.use('/api/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false }));

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Lavit Tyagi (लवित त्यागी)', maxlength: 120 },
  title: { type: String, default: 'Data Analytics & Full-Stack Developer', maxlength: 160 },
  contact: { type: String, default: 'Add your public contact details', maxlength: 200 },
  summary: { type: String, default: '', maxlength: 3000 },
  textAlign: { type: String, enum: ['left', 'center', 'right', 'justify'], default: 'justify' },
  nameAlign: { type: String, enum: ['left', 'center', 'right'], default: 'left' },
  titleAlign: { type: String, enum: ['left', 'center', 'right'], default: 'left' },
  contactAlign: { type: String, enum: ['left', 'center', 'right'], default: 'left' },
  summaryHeadingAlign: { type: String, enum: ['left', 'center', 'right'], default: 'left' },
  skillsAlign: { type: String, enum: ['left', 'center', 'right', 'justify'], default: 'left' },
  skillsHeadingAlign: { type: String, enum: ['left', 'center', 'right'], default: 'left' },
  template: { type: String, enum: ['classic', 'modern', 'minimal'], default: 'classic' },
  fontFamily: { type: String, enum: ['sans', 'serif', 'mono'], default: 'sans' },
  fontSize: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
  accentColor: { type: String, match: /^#[0-9a-f]{6}$/i, default: '#0284c7' },
  aboutBio: {
    type: String,
    default: 'I am a Computer Science Engineering student at ITM University Gwalior. I work on web applications, data analytics, and machine-learning projects.',
    maxlength: 3000
  },
  aboutSkills: {
    type: [{ type: String, trim: true, maxlength: 100 }],
    default: ['Python', 'SQL', 'Excel', 'Power BI / Tableau', 'React', 'Node.js', 'MongoDB', 'Pandas']
  },
  aboutStats: {
    type: [{
      title: { type: String, trim: true, maxlength: 120 },
      label: { type: String, trim: true, maxlength: 160 }
    }],
    default: [
      { title: '2026', label: 'Graduation Year' },
      { title: 'Python', label: 'Analytics' },
      { title: 'SQL', label: 'Databases' },
      { title: 'MERN', label: 'Web Development' }
    ]
  },
  projects: {
    type: [{
      title: { type: String, trim: true, maxlength: 160 },
      category: { type: String, enum: ['ds', 'da', 'web'] },
      desc: { type: String, maxlength: 3000 },
      tags: { type: [{ type: String, trim: true, maxlength: 80 }], default: [] },
      link: { type: String, maxlength: 2000, default: '' }
    }],
    default: [
      { title: 'Travel and Tourism Web Application', category: 'web', desc: 'MERN-stack platform concept for travel services, bookings, and user accounts.', tags: ['React', 'Node.js', 'MongoDB'], link: 'https://github.com' },
      { title: 'Soil Health Analysis', category: 'ds', desc: 'Machine-learning project exploring crop prediction from soil and environmental features.', tags: ['Python', 'Pandas', 'Scikit-learn'], link: 'https://github.com' },
      { title: 'Sales Analytics Dashboard', category: 'da', desc: 'Dashboard concept for tracking sales performance and business KPIs.', tags: ['Excel', 'SQL', 'Power BI'], link: '' },
      { title: 'Course Management System', category: 'web', desc: 'Web application concept for course listings, enrollment, and progress tracking.', tags: ['React', 'Express', 'MongoDB'], link: '' }
    ]
  },
  certificates: {
    type: [{
      title: { type: String, trim: true, maxlength: 160 },
      desc: { type: String, maxlength: 3000 },
      link: { type: String, maxlength: 2000, default: '' }
    }],
    default: [
      { title: 'Certifications & Training', desc: 'Certificate details can be added after verification.', link: '' },
      { title: 'Academic Learning', desc: 'Computer Science Engineering — ITM University Gwalior.', link: '' }
    ]
  },
  skills: {
    type: [{ name: { type: String, maxlength: 100 }, level: { type: Number, min: 0, max: 100 } }],
    default: [
      { name: 'Python', level: 80 },
      { name: 'SQL', level: 80 },
      { name: 'Excel', level: 80 },
      { name: 'MERN Stack', level: 70 }
    ]
  },
  sections: {
    type: [{
      heading: { type: String, maxlength: 120 },
      body: { type: String, maxlength: 5000 },
      headingAlign: { type: String, enum: ['left', 'center', 'right', 'justify'], default: 'left' },
      bodyAlign: { type: String, enum: ['left', 'center', 'right', 'justify'], default: 'left' }
    }],
    default: [
      { heading: 'EDUCATION', body: 'B.Tech Computer Science Engineering — ITM University Gwalior', headingAlign: 'left', bodyAlign: 'left' },
      { heading: 'PROJECTS', body: 'Travel and Tourism Web Application — MERN stack project', headingAlign: 'left', bodyAlign: 'left' }
    ]
  },
  photoUrl: { type: String, default: '' }, pdfUrl: { type: String, default: '' }, pdfName: { type: String, default: '' }
}, { timestamps: true });
const Profile = mongoose.model('Profile', profileSchema);

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024, files: 1 } });
function normalizePdfFilename(filename) {
  const originalName = String(filename || 'Published resume.pdf');
  const decodedName = Buffer.from(originalName, 'latin1').toString('utf8');
  const canDecode = /[ÃÂ][\u0080-\u00BF]/.test(originalName) &&
    !decodedName.includes('\uFFFD') &&
    !/[\u0000-\u001F]/.test(decodedName);
  const safeName = (canDecode ? decodedName : originalName)
    .normalize('NFC')
    .replace(/[\\/\u0000-\u001F\u007F]/g, '_')
    .trim();
  if (!safeName) return 'Published resume.pdf';
  if (safeName.length <= 180) return safeName;
  const extensionStart = safeName.lastIndexOf('.');
  const extension = extensionStart >= 0 && safeName.length - extensionStart <= 10
    ? safeName.slice(extensionStart)
    : '';
  return safeName.slice(0, 180 - extension.length) + extension;
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Please sign in as admin.' });
  try { const decoded = jwt.verify(token, process.env.JWT_SECRET); if (decoded.role !== 'admin') throw new Error('Invalid role'); req.admin = decoded; next(); }
  catch { return res.status(401).json({ message: 'Your login has expired. Please sign in again.' }); }
}
async function getProfile() {
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({});
  return profile;
}
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH || !process.env.JWT_SECRET) return res.status(503).json({ message: 'Admin credentials are not configured on the server.' });
    const validEmail = typeof email === 'string' && email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase();
    const validPassword = typeof password === 'string' && await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!validEmail || !validPassword) return res.status(401).json({ message: 'Email or password is incorrect.' });
    const token = jwt.sign({ role: 'admin', email: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET, { expiresIn: '8h' });
    return res.json({ token, expiresIn: 28800 });
  } catch (error) { console.error(error); return res.status(500).json({ message: 'Login failed.' }); }
});
app.get('/api/auth/me', requireAdmin, (req, res) => res.json({ authenticated: true }));
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await getProfile();
    res.set('Cache-Control', 'no-store');
    const profileData = profile.toObject();
    profileData.pdfName = normalizePdfFilename(profileData.pdfName);
    res.json({ profile: profileData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not load profile.' });
  }
});
app.get('/api/resume/pdf', async (req, res) => {
  try {
    const profile = await getProfile();
    if (!profile.pdfUrl) return res.status(404).json({ message: 'No PDF resume has been published.' });

    const cloudinaryUrl = new URL(profile.pdfUrl);
    const expectedPathPrefix = `/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/`;
    if (
      cloudinaryUrl.protocol !== 'https:' ||
      cloudinaryUrl.hostname !== 'res.cloudinary.com' ||
      !cloudinaryUrl.pathname.startsWith(expectedPathPrefix)
    ) {
      console.error('Stored resume URL is not a valid Cloudinary raw asset URL.');
      return res.status(502).json({ message: 'The published PDF could not be loaded.' });
    }

    const upstream = await fetch(cloudinaryUrl);
    if (!upstream.ok) {
      console.error(`Cloudinary PDF request failed with status ${upstream.status}.`);
      return res.status(502).json({ message: 'The published PDF could not be loaded.' });
    }

    const pdf = Buffer.from(await upstream.arrayBuffer());
    if (!pdf.subarray(0, 1024).includes(Buffer.from('%PDF-'))) {
      console.error('The stored resume asset is not a valid PDF.');
      return res.status(502).json({ message: 'The published file is not a valid PDF.' });
    }

    const filename = normalizePdfFilename(profile.pdfName);
    const asciiFilename = filename.replace(/[^\x20-\x7E]/g, '_').replace(/["\\]/g, '_');
    const encodedFilename = encodeURIComponent(filename).replace(/['()*]/g, char =>
      '%' + char.charCodeAt(0).toString(16).toUpperCase()
    );
    const disposition = req.query.disposition === 'attachment' ? 'attachment' : 'inline';

    res.set({
      'Cache-Control': 'no-store',
      'Content-Type': 'application/pdf',
      'Content-Length': String(pdf.length),
      'Content-Disposition': `${disposition}; filename="${asciiFilename}"; filename*=UTF-8''${encodedFilename}`,
      'X-Content-Type-Options': 'nosniff',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Content-Security-Policy': 'frame-ancestors *'
    });
    res.removeHeader('X-Frame-Options');
    res.send(pdf);
  } catch (error) {
    console.error('Could not serve the published PDF:', error);
    res.status(502).json({ message: 'The published PDF could not be loaded.' });
  }
});
app.put('/api/profile', requireAdmin, async (req, res) => {
  try {
    const body = req.body || {};
    const allowed = [
      'name', 'title', 'contact', 'summary', 'textAlign', 'nameAlign', 'titleAlign',
      'contactAlign', 'summaryHeadingAlign', 'skillsAlign', 'skillsHeadingAlign',
      'template', 'fontFamily', 'fontSize', 'accentColor', 'aboutBio', 'aboutSkills',
      'aboutStats', 'projects', 'certificates', 'skills', 'sections'
    ];
    const update = {};
    for (const key of allowed) {
      if (Object.hasOwn(body, key)) update[key] = body[key];
    }
    const arrayLimits = {
      aboutSkills: 40,
      aboutStats: 20,
      projects: 50,
      certificates: 50,
      skills: 40,
      sections: 30
    };
    for (const [field, limit] of Object.entries(arrayLimits)) {
      if (Object.hasOwn(update, field) && (!Array.isArray(update[field]) || update[field].length > limit)) {
        return res.status(400).json({ message: `${field} must be a list with no more than ${limit} entries.` });
      }
    }
    const profile = await Profile.findOneAndUpdate({}, { $set: update }, { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true });
    res.json({ profile });
  } catch (error) { console.error(error); res.status(400).json({ message: 'Could not save profile. Check the fields and try again.' }); }
});
async function uploadToCloudinary(file, resourceType, folder) {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) throw new Error('Cloudinary file storage is not configured on the server.');
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ resource_type: resourceType, folder, ...(resourceType === 'raw' ? { use_filename: true, unique_filename: true } : {}) }, (error, result) => error ? reject(error) : resolve(result));
    stream.end(file.buffer);
  });
}
app.post('/api/upload/photo', requireAdmin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file || !['image/jpeg', 'image/png', 'image/webp'].includes(req.file.mimetype)) return res.status(400).json({ message: 'Upload a JPG, PNG, or WebP image.' });
    if (req.file.size > 5 * 1024 * 1024) return res.status(400).json({ message: 'Image must be 5 MB or smaller.' });
    const result = await uploadToCloudinary(req.file, 'image', 'lavit-portfolio/profile');
    const profile = await getProfile(); profile.photoUrl = result.secure_url; await profile.save();
    res.json({ url: result.secure_url });
  } catch (error) { console.error(error); res.status(500).json({ message: error.message || 'Photo upload failed.' }); }
});
app.post('/api/upload/resume', requireAdmin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file || req.file.mimetype !== 'application/pdf') return res.status(400).json({ message: 'Upload a valid PDF file.' });
    if (!req.file.buffer.subarray(0, 1024).includes(Buffer.from('%PDF-'))) return res.status(400).json({ message: 'The selected file is not a valid PDF.' });

    const sanitizedName = normalizePdfFilename(req.file.originalname);
    if (!sanitizedName.toLowerCase().endsWith('.pdf')) return res.status(400).json({ message: 'Upload a valid PDF file.' });
    const originalName = sanitizedName;

    req.file.originalname = originalName;
    const result = await uploadToCloudinary(req.file, 'raw', 'lavit-portfolio/resumes');
    const profile = await getProfile(); profile.pdfUrl = result.secure_url; profile.pdfName = originalName; await profile.save();
    res.json({ url: result.secure_url, originalName: profile.pdfName });
  } catch (error) { console.error(error); res.status(500).json({ message: error.message || 'PDF upload failed.' }); }
});
app.use((err, req, res, next) => { if (err instanceof multer.MulterError) return res.status(400).json({ message: 'File is too large or could not be uploaded.' }); console.error(err.message); res.status(500).json({ message: 'Server error.' }); });
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI).then(() => { app.listen(port, () => console.log(`Portfolio API listening on ${port}`)); }).catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
