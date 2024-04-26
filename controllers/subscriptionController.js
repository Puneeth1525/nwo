
const Subscription = require('../models/subscriptionModel');

async function createUserSubscription(req, res) {
  try {
    const { userName, industry, source, subcategory } = req.body;
    const existingSubscription = await Subscription.findOne({ userName });
    if (existingSubscription) {
      return res.status(400).json({ error: 'Subscription already exists for this user' });
    }
    const newSubscription = new Subscription({ userName, industry, source, subcategory });
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getUserSubscription(req, res) {
  try {
    const userName = req.params.userName;
    const subscription = await Subscription.findOne({ userName });
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    res.json(subscription);
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateUserSubscription(req, res) {
  try {
    const userName = req.params.userName;
    const { industry, source, subcategory } = req.body;
    const subscription = await Subscription.findOneAndUpdate(
      { userName },
      { industry, source, subcategory },
      { new: true }
    );
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    res.json(subscription);
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteUserSubscription(req, res) {
  try {
    const userName = req.params.userName;
    const subscription = await Subscription.findOneAndDelete({ userName });
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllSubscriptions(req, res) {
  try {
    const subscriptions = await Subscription.find({});
    res.json(subscriptions);
  } catch (error) {
    console.error('Error retrieving subscriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createUserSubscription,
  getUserSubscription,
  updateUserSubscription,
  deleteUserSubscription,
  getAllSubscriptions
};
