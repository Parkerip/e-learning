const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES (filenames must match exactly)
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/auth', require('./routes/google.routes'));
app.use('/api/courses', require('./routes/course.route'));
app.use('/api/admin', require('./routes/admin.route'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('E-Learning API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
