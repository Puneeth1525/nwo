
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Token = require('../models/tokenModel');

async function generateToken(req, res) {
  const { email } = req.body;

  try {
    
    const existingToken = await Token.findOne({ email });

    if (existingToken) {
      return res.json({ token: existingToken.token });
    }

    
    let token = "Bearer "+crypto.randomBytes(20).toString('hex');

    
    await Token.create({ email, token });

    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'puritipati.puniith@gmail.com',
        pass: 'ProximusCentauri1234*'
      }
    });

    const mailOptions = {
      from: 'puritipati.puniith@gmail.com',
      to: email,
      subject: 'Your Authentication Token',
      text: `Your token: ${token}`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.error('Error sending token:', error);
        res.status(500).json({ error: 'Error sending token' });
        res.json({ message: 'please copy your Auth Token: ', token})
      } else {
        console.log('Token sent:', info.response);
        res.json({ message: 'Token sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Error generating token' });
  }
}

function authenticateToken(req, res, next) {
    let token = req.headers.authorization;
    token = token.replace('Bearer ', '');

    console.log("headers token: ",token)
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Token is required' });
    }
  
    Token.exists({ token })
      .then(tokenExists => {

        if (!tokenExists) {
            console.log("not there")
          return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        next();
      })
      .catch(err => {
        console.error('Error checking token:', err);
        res.status(500).json({ error: 'Internal server error' });
      });
  }
  

module.exports = {
  generateToken,
  authenticateToken
};
