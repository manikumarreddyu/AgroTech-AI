
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


exports.getOrderHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('rentals.product');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const rentals = user.rentals.map(rental => {
      return {
        rentalId: rental.rentalId,
        productName: rental.product.name,
        rentalDate: rental.rentalDate,
        returnDate: rental.returnDate,
        status: rental.status,
        totalCost: rental.product.rentalPricePerDay * rental.rentalDuration,
        rentalDuration: rental.rentalDuration,
      };
    });

    res.status(200).json({ rentals });
  } catch (error) {
    console.error(`Error in getOrderHistory: ${error.message}`, error);
    res.status(500).json({ error: "An error occurred while fetching the order history." });
  }
};


// Re-rent previously rented items
exports.reRent = async (req, res) => {
  try {
    const { rentalId } = req.params; // Get rental ID from params
    const user = await User.findById(req.user.id).populate('rentals.product');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const rental = user.rentals.find(rental => rental.rentalId === rentalId);
    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }

    const product = rental.product;

    // Check if product is available for re-rental
    if (product.availabilityStatus !== "available") {
      return res.status(400).json({ error: "Product is not available for re-rental" });
    }

    // Create new rental entry
    const newRental = {
      rentalId: `RENT-${Date.now()}`, // New rental ID
      product: product._id,
      quantity: rental.quantity,
      rentalDuration: rental.rentalDuration, // Same duration as previous
      rentalDate: Date.now(),
      status: "ongoing",
    };

    user.rentals.push(newRental);
    await user.save();

    res.status(200).json({ message: "Re-rental successful", newRental });
  } catch (error) {
    console.error(`Error in reRent: ${error.message}`, error);
    res.status(500).json({ error: "An error occurred while re-renting the item." });
  }
};


// Generate rental receipt with pricing and terms
exports.generateReceipt = async (req, res) => {
  try {
    const { rentalId } = req.params;
    const user = await User.findById(req.user.id).populate('rentals.product');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const rental = user.rentals.find(rental => rental.rentalId === rentalId);
    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }

    const product = rental.product;
    const totalCost = product.rentalPricePerDay * rental.rentalDuration;

    const receipt = {
      rentalId: rental.rentalId,
      productName: product.name,
      rentalDate: rental.rentalDate,
      returnDate: rental.returnDate,
      rentalDuration: rental.rentalDuration,
      totalCost: totalCost,
      rentalTerms: product.rentalTerms || "N/A", // Include rental terms if available
      pricePerDay: product.rentalPricePerDay,
    };

    res.status(200).json({ receipt });
  } catch (error) {
    console.error(`Error in generateReceipt: ${error.message}`, error);
    res.status(500).json({ error: "An error occurred while generating the receipt." });
  }
};

