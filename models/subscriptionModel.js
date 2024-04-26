// src/models/subscriptionModel.js

const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  industry: String,
  source: String,
  subcategory: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
