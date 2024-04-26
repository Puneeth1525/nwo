
const express = require('express');
const bodyParser = require('body-parser');
const subscriptionController = require('./controllers/subscriptionController');
const mongoose = require('mongoose');
const tokenController = require('./controllers/tokenController');


const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://puritipatipuneeth:rmm2ne2BJxPecgeS@cluster0.newdr7q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());

app.post('/subscriptions', tokenController.authenticateToken, subscriptionController.createUserSubscription);
app.get('/subscriptions/:userName', tokenController.authenticateToken, subscriptionController.getUserSubscription);
app.put('/subscriptions/:userName', tokenController.authenticateToken, subscriptionController.updateUserSubscription);
app.delete('/subscriptions/:userName', tokenController.authenticateToken, subscriptionController.deleteUserSubscription);
app.get('/allSubscriptions', tokenController.authenticateToken, subscriptionController.getAllSubscriptions);
app.post('/genToken', tokenController.generateToken);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
