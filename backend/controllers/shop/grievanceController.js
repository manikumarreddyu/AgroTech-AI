const Grievance = require('../../model/shop/grievance');
const User = require('../../model/user');
const nodemailer = require('nodemailer');

exports.createGrievance = async (req, res) => {
  try {
    const { nanoid } = await import('nanoid');
    const { userId, orderNumber, category, description } = req.body;

    // Find user by userId to get the user's email
    const user = await User.findById(userId);
    if (!user) {
        console.log("two")
      return res.status(404).json({ message: 'User not found' });
    }
    // Create a new grievance
    const grievance = new Grievance({
      userId,          // Store the userId
      email: user.email, // Automatically populate email from the User schema
      orderNumber,
      category,
      description,
      reportId: nanoid(8),
    });
    console.log(grievance)
    // Save the grievance
    await grievance.save();

    // Set up email transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use a secure service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail options to send confirmation to the user
    const mailOptions = {
      from: '"Agro-tech AI Support" <support@agrotechai.com>',
      to: user.email, // Send email to the user
      subject: 'Grievance Report Confirmation',
      text: `Hello ${user.firstName},\n\nThank you for submitting your grievance report. We have received your report and will review it shortly.\n\nYour Report ID: ${grievance.reportId}\n\nYou can expect a response from our team soon. If you have any additional information to add, please reply to this email.\n\nBest Regards,\nAgro-Shop AI Support Team`,
    };

    // Send the confirmation email
    await transporter.sendMail(mailOptions);

    // Send response to the client
    res.status(201).json({
      message: 'Grievance submitted successfully',
      grievance,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      message: 'Failed to submit grievance',
      error: error.message,
    });
  }
};

  

// Get all grievances
exports.getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find();
    res.status(200).json(grievances);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve grievances', error: error.message });
  }
};
// Get a grievance by reportId
exports.getGrievanceById = async (req, res) => {
    try {
      const { reportId } = req.params; // Extract reportId from URL params
      const grievance = await Grievance.findOne({ reportId }); // Find by reportId
  
      if (!grievance) {
        return res.status(404).json({ message: 'Grievance not found' });
      }
  
      res.status(200).json(grievance);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve grievance', error: error.message });
    }
  };
  
  // Update a grievance status based on reportId
  exports.updateGrievanceStatus = async (req, res) => {
    try {
      const { reportId } = req.params; // Extract reportId from URL params
      const { status } = req.body; // Extract status from request body
  
      const grievance = await Grievance.findOne({ reportId }); // Find grievance by reportId
  
      if (!grievance) {
        return res.status(404).json({ message: 'Grievance not found' });
      }
  
      grievance.status = status; // Update the status
      await grievance.save();
  
      res.status(200).json({ message: 'Grievance status updated successfully', grievance });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update grievance status', error: error.message });
    }
  };
  
  // Delete a grievance by reportId
  exports.deleteGrievance = async (req, res) => {
    try {
      const { reportId } = req.params; // Extract reportId from URL params
  
      const grievance = await Grievance.findOneAndDelete({ reportId }); // Delete grievance by reportId
  
      if (!grievance) {
        return res.status(404).json({ message: 'Grievance not found' });
      }
  
      res.status(200).json({ message: 'Grievance deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete grievance', error: error.message });
    }
  };
  
