const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  tmdbId: { type: Number, required: true },
  title: { type: String, required: true },
  posterPath: { type: String },
});

const collectionSchema = new Schema({
  name: { type: String, required: true },
  movies: [{ type: movieSchema }],
});

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  displayName: { type: String },
  collections: [collectionSchema],
});

const reelrec = mongoose.model('ReelRec', userSchema);

module.exports = reelrec;
