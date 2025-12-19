const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://e-learning-8e683.web.app',
    'https://e-learning-8e683.firebaseapp.com'
  ],
  credentials: true
}));

app.use(express.json());

/* ---------- DATABASE ---------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

/* ---------- ROUTES ---------- */
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/auth', require('./routes/google.routes'));
app.use('/api/courses', require('./routes/course.route'));
app.use('/api/admin', require('./routes/admin.route'));
app.use('/api/videos', require('./routes/video.route'));
app.use('/api/test', require('./routes/test.route'));

// ✅ contact route (ONLY if file exists as contact.route.js)

/* ---------- HEALTH CHECK ---------- */
app.get('/', (req, res) => {
  res.send('E-Learning API Running');
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
