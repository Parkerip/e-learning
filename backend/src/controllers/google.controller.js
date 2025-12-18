const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ message: 'No Google token' });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const { email, name } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: 'GOOGLE_AUTH',
        role: 'user'
      });
    }

    const jwtToken = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token: jwtToken });

  } catch (err) {
    console.error('Google auth error:', err.message);
    res.status(401).json({ message: 'Google authentication failed' });
  }
};


// const { OAuth2Client } = require("google-auth-library");
// const User = require("../models/user");
// const jwt = require("jsonwebtoken");

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const generateToken = (userId) => {
//   return jwt.sign(
//   {
//     id: user._id,
//     role: user.role
//   },
//   process.env.JWT_SECRET,
//   { expiresIn: '7d' }
// );

// };

// exports.googleLogin = async (req, res) => {
//   try {
//     const { token } = req.body;

//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID
//     });

//     const { name, email } = ticket.getPayload();

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         role: "student"
//       });
//     }

//     res.json({
//       token: generateToken(user._id),
//       user
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ message: "Google login failed" });
//   }
// };
