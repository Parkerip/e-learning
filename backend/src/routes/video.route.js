const express = require('express');
const router = express.Router();
const Video = require('../models/video.model');

router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
