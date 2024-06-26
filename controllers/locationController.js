const Location = require('../models/locationModel'); // Assuming you have a separate model file

// Function to handle location data saving
exports.saveLocation = async (req, res) => {
  const { latitude, longitude } = req.body;

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).send('Latitude and Longitude must be numbers');
  }

  const newLocation = new Location({ latitude, longitude });

  try {
    await newLocation.save();
    res.status(201).send('Location saved');
  } catch (err) {
    res.status(400).send('Error saving location');
  }
};
