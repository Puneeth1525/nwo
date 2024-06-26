const Location = require('../models/locationModel');

exports.saveLocation = async (req, res) => {
  const { latitude, longitude } = req.body;

  const newLocation = new Location({ latitude, longitude });

  try {
    await newLocation.save();
    res.status(201).send('Location saved');
  } catch (err) {
    res.status(400).send('Error saving location');
  }
};
