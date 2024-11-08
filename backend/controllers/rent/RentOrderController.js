
const nodemailer = require('nodemailer');

const sendOrderConfirmationEmail = async (userDetails, cartItems, totalPrice, trackingID) => {
  // Create a transporter using Gmail's SMTP server
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider (e.g., 'gmail', 'smtp.mailtrap.io', etc.)
    auth: {
      user: process.env.EMAIL_USER, // Replace with your Gmail email address
      pass: process.env.EMAIL_PASS, // Replace with your Gmail password or App Password
    },
  });

  // Define the email details
  const mailOptions = {
    from: 'your-email@gmail.com', // Sender's email
    to: userDetails.email, // Recipient's email
    subject: 'Order Confirmation',
    html: `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order, ${userDetails.name}!</p>
      <h3>Your Order Details</h3>
      <ul>
        ${cartItems
          .map(
            (item) => `
          <li>
            <strong>${item.name}</strong> - ${item.quantity} x ₹${item.price} = ₹${item.quantity * item.price}
          </li>`
          )
          .join('')}
      </ul>
      <h3>Total Price: ₹${totalPrice}</h3>
      <p>Your tracking ID: <strong>${trackingID}</strong></p>
      <p>Your order will be processed shortly. Thank you!</p>
    `,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

exports.OrderConfirmation  = async (req, res) => {
  try {
    const { userDetails, cartItems, totalPrice } = req.body;

    // Generate a random tracking ID
    const trackingID = 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Send the confirmation email
    await sendOrderConfirmationEmail(userDetails, cartItems, totalPrice, trackingID);

    res.status(200).json({
      message: 'Order confirmed! A confirmation email has been sent.',
      trackingID,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send confirmation email.' });
  }
};


