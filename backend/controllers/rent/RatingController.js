const nodemailer = require('nodemailer');
const express = require('express');
const RentProduct = require('../../model/rent/rentProduct');
const router = express.Router();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route to submit a rating
exports.ratingController = async (req, res) => {
  const { productId } = req.params;
  const { rentalId, rating, comment, userEmail } = req.body;

  try {
    // Find the product and add the review
    const product = await RentProduct.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.reviews.push({ rentalId, rating, comment });
    product.rating =
      product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length;

    await product.save();

    // Customize email content based on rating
    const isPositive = rating >= 4;
    const emailContent = isPositive
      ? {
          subject: 'Thank you for your feedback!',
          text: `We appreciate your positive review! Explore similar products at: [your link here]`,
        }
      : {
          subject: 'We value your feedback!',
          text: `We're sorry for your experience. Here's a discount code for your next rental: THANKYOU10`,
        };

    await transporter.sendMail({
      from: '"AGRO-TECH AI" <noreply@agrotechaigmail.com>',
      to: userEmail,
      subject: emailContent.subject,
      text: emailContent.text,
    });

    res.status(200).json({ message: 'Review submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting review' });
  }
}

