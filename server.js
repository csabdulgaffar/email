const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(cors());
// Set up middleware and routes
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));

})

app.post('/', (req, res) => {
    const { name, email, message } = req.body;

    console.log(name, email, message);
    // Create a transporter object with Mailtrap credentials
    var transport = nodemailer.createTransport({
        host: "live.smtp.mailtrap.io",
        port: 587,
        auth: {
            user: "api",
            pass: "f2dd40af702e0b5e1ac9ee94cc2227e0"
        }
    });

    // Set up the email data
    const mailOptions = {
        from: 'mailtrap@demomailtrap.com',
        to: 'csabdulgaffar@gmail.com', // Replace with your email address
        subject: 'New Contact Form Submission',
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
    };

    // Send the email
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

console.log('hello')

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});