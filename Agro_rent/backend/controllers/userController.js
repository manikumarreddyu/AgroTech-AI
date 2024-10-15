const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { route } = require('../routes/user');

//@desc Get all users
//@route GET /api/user
//@access Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');
    res.status(200).json({message: 'Success',users});
});


//@desc Get user by email and validate role
//@route GET /api/user/validateRole
//@access Private
const validateUserRole = asyncHandler(async (req, res) => {
    const { email } = req.params;

    // Fetch user from the database by email
    const user = await User.findOne({ email }).select('-password');
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is an owner
    if (user.role !== 'owner') {
        return res.status(403).json({ message: 'Invalid role: Access denied' });
    }

    // If user is an owner, allow them to proceed
    res.status(200).json({ message: 'Success', user });
});

//@desc Get user by ID
//@route GET /api/user/
//@access Private
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }

    res.status(200).json({message: 'Success',user});
});

//@desc Login user
//@route POST /api/user/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message: 'Please fill all fields'});
    }
    const user = await User.findOne({ email });

    //compare password with hashed password
    if(user && bcrypt.compareSync(password, user.password)){
        const token = jwt.sign({ user : {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        } }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' });
        user.password = undefined;
        res.setHeader('Authorization', 'Bearer ' + token);
        res.status(200).json({message: 'Success',user, token});
    }else{
        res.status(401).json({message: 'Invalid name or password'});
    }
});
 
//@desc logout User 
//@route POST /api/user/logout
//@access Public
//@desc Logout user
//@route POST /api/user/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
    // Optionally, you can also clear the token from the response headers
    res.setHeader('Authorization', '');
    
    // If you're storing the token in cookies, clear the cookie as well
    res.clearCookie('token'); // assuming you're using cookies for token storage
    
    // Send a success response to indicate logout
    res.status(200).json({ message: 'Logged out successfully' });
});


//@desc Register user
//@route POST /api/user
//@access Public
const createUser = asyncHandler(async (req, res) => {
    let userDetails = req.body;

    if(!userDetails.name || !userDetails.email || !userDetails.password || !userDetails.role){
        return res.status(400).json({message: 'Please fill all fields'});
    }

    const userAvailable = await User.findOne({ email : userDetails.email });
    if(userAvailable){
        return res.status(400).json({message: 'User already exists'});
    }
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userDetails.password, salt);

    userDetails.password = hashedPassword;
    const user = await User.create({...userDetails});

    console.log(user);
    if(user){
        res.status(200).json({ message: 'Success',
            user
        });
    }else{
        res.status(400).json({ message: 'Invalid user data'});
    }
    
});

//@desc Update user
//@route PUT /api/user/
//@access Public
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true
    }).select('-password');
    res.status(200).json({message: 'Success',updatedUser});
});

//@desc Delete user
//@route DELETE /api/user/
//@access Public
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({message: 'Success',user});
});

module.exports = { getUsers, loginUser, logoutUser, getUser, createUser, updateUser, deleteUser, validateUserRole };
