
const Subscription = require('../models/subscriptionModel');

async function createUserSubscription(req, res) {
  try {
    const { userName, industry, source, subcategory } = req.body;
    const existingSubscription = await Subscription.findOne({ userName });

    console.log(`Creating subscription for user: ${userName}`);

    if (existingSubscription) {
      console.error('Subscription already exists for this user');
      return res.status(400).json({ error: 'Subscription already exists for this user' });
    }
    const newSubscription = new Subscription({ userName, industry, source, subcategory });
    await newSubscription.save();
    console.log('Subscription created successfully:', newSubscription);
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
    console.log(`Getting subscription for user: ${userName}`);

    if (!subscription) {
      console.error('Subscription not found');
      return res.status(404).json({ error: 'Subscription not found' });
    }
    console.log('Subscription found:', subscription);
    res.json(subscription);
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateUserSubscription(req, res) {
  try {
    const { userName } = req.body;;
    const { industry, source, subcategory, isActive } = req.body;

    console.log(`Updating subscription for user: ${userName}`);

    const subscription = await Subscription.findOneAndUpdate(
      { userName },
      { industry, source, subcategory, isActive },
      { 
        new: true,
        upsert: true
      }
    );
    if (!subscription) {
      console.error('Subscription not found');
      return res.status(404).json({ error: 'Subscription not found' });
    }
    console.log('Subscription updated successfully:', subscription);
    res.json(subscription);
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteUserSubscription(req, res) {
  try {
    const { userName } = req.body;
    console.log(`Deleting subscription for user: ${userName}`);
    const subscription = await Subscription.findOneAndDelete({ userName });
    if (!subscription) {
      console.error('Subscription not found');
      return res.status(404).json({ error: 'Subscription not found' });
    }
    console.log('Subscription deleted successfully');
    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllSubscriptions(req, res) {
  try {
    let { page, limit } = req.query;

    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skip = (pageNumber - 1) * limitNumber;

    console.log(`Fetching subscriptions - Page: ${pageNumber}, Limit: ${limitNumber}`);

    const subscriptions = await Subscription.find({}).skip(skip).limit(limitNumber);

    const formattedSubscriptions = JSON.stringify(subscriptions, null, 2);

    console.log('Subscriptions retrieved successfully:', `${formattedSubscriptions}`);

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
