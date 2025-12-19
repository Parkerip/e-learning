const nodemailer = require('nodemailer');

exports.sendContactMail = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kannanprem7781@gmail.com',
      pass: 'YOUR_GMAIL_APP_PASSWORD'
    }
  });

  await transporter.sendMail({
    from: email,
    to: 'kannanprem7781@gmail.com',
    subject: `Contact from ${name}`,
    text: message
  });

  res.json({ message: 'Message sent successfully' });
};
