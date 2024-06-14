const axios = require('axios');
const faker = require('faker');

async function createSubscription() {
  try {
    const userName = faker.internet.userName();
    const industry = faker.commerce.department();
    const source = faker.random.word();
    const subcategory = faker.commerce.productAdjective();

    const response = await axios.post('18.190.29.212:3000/subscriptions', {
      userName,
      industry,
      source,
      subcategory
    });

    console.log(`Subscription created successfully: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('Error creating subscription:', error.response ? error.response.data : error.message);
  }
}

async function createMultipleSubscriptions(numSubscriptions) {
  try {
    for (let i = 0; i < numSubscriptions; i++) {
      await createSubscription();
    }
    console.log(`Successfully created ${numSubscriptions} subscriptions.`);
  } catch (error) {
    console.error('Error creating subscriptions:', error);
  }
}

const numSubscriptions = 5;

createMultipleSubscriptions(numSubscriptions);
