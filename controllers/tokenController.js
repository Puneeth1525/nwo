
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Token = require('../models/tokenModel');

async function generateToken(req, res) {
  const { email } = req.body;

  try {
    
    const existingToken = await Token.findOne({ email });

    if (existingToken) {
        console.log(`Token already exists for email: ${email}. Returning existing token.`);
        return res.json({ token: existingToken.token });
    }

    
    let token = "Bearer "+crypto.randomBytes(20).toString('hex');

    
    await Token.create({ email, token });
    console.log("Genrating new Token for ", email)

    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'puritipati.puniith@gmail.com',
        pass: 'yourPWD'
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
            console.error('Error Emailing token:', error);
            res.status(500).json({ error: 'Error Emailing token, generated token: ', token });
          } else {
            console.log(`Token sent to ${email}: ${info.response}`);
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
        console.error('Unauthorized: Token is required');
        return res.status(401).json({ error: 'Unauthorized: Token is required' });
    }
  
    Token.exists({ token })
      .then(tokenExists => {

        if (!tokenExists) {
            console.error('Unauthorized: Invalid token');
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
