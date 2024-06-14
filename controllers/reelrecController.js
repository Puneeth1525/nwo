const ReelRec = require('../models/reelrecModel');

exports.createUser = async (req, res) => {
  try {
    const { email, displayName, collections } = req.body;

    const newUser = new ReelRec({
      email,
      displayName,
      collections: collections || []
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await ReelRec.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await ReelRec.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await ReelRec.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await ReelRec.findByIdAndDelete(req.params.userId);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addCollection = async (req, res) => {
  try {
    const user = await ReelRec.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.collections.push(req.body);
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCollection = async (req, res) => {
  try {
    const user = await ReelRec.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const collection = user.collections.id(req.params.collectionId);
    if (!collection) return res.status(404).json({ message: 'Collection not found' });

    Object.assign(collection, req.body);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    const user = await ReelRec.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.collections.id(req.params.collectionId).remove();
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addMovie = async (req, res) => {
  try {
    const user = await ReelRec.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const collection = user.collections.id(req.params.collectionId);
    if (!collection) return res.status(404).json({ message: 'Collection not found' });

    collection.movies.push(req.body);
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const user = await ReelRec.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const collection = user.collections.id(req.params.collectionId);
    if (!collection) return res.status(404).json({ message: 'Collection not found' });
    const movie = collection.movies.id(req.params.movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    Object.assign(movie, req.body);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const user = await ReelRec.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const collection = user.collections.id(req.params.collectionId);
    if (!collection) return res.status(404).json({ message: 'Collection not found' });

    collection.movies.id(req.params.movieId).remove();
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
