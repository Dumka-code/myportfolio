const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/api/send-welcome-email', (req, res) => {
  const { email } = req.body;

  // Setup Nodemailer transporter with your SMTP server details
  const transporter = nodemailer.createTransport({
    host: 'dumkabipnelo.website',
    port: 465,
    secure: true, // Set to true if using SSL/TLS
    auth: {
      user: 'dev@dumkabipnelo.website',
      pass: '$Dumka0510',
    },
  });

  // Email options
  const mailOptions = {
    from: 'dev@dumkabipnelo.website',
    to: email,
    subject: 'Welcome to the Newsletter!',
    text: `Thank you for subscribing to our newsletter! We're excited to have you on board.`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending welcome email:', error);
      return res.status(500).send('Internal Server Error');
    }

    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
