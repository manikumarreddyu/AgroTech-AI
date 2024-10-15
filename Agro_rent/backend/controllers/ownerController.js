const asyncHandler = require('express-async-handler');
const Owner = require('../models/owner');

//@desc Get owner by ID
//@route GET /api/owner/
//@access Private
const getOwner = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const owner = await Owner.findOne({ userId })
    .populate('machines')
    .populate('bookings')
    .exec();
    
    if(!owner) {
        return res.status(404).json({message: 'Owner not found'});
    }

    res.status(200).json({message: 'Success',owner});
});

//@desc Register owner
//@route POST /api/owner
//@access Public
const createOwner = asyncHandler(async (req, res) => {
    if(req.user.role !== 'farmer'){
        return res.status(401).json({message: 'Unauthorized'});
    }
    const owner = new Owner({
        userId: req.user.id,
        machines: [],
        bookings: [],
        accStatus: 'active'
    });
    owner.save().then(owner => {
        res.status(201).json({message: 'Owner created', owner});
    }).catch(err => {
        console.log(err);
    });
});

//@desc Update owner
//@route PUT /api/owner/
//@access Public
const updateOwner = asyncHandler(async (req, res) => {
    if(req.user.role !== 'owner'){
        return res.status(401).json({message: 'Unauthorized'});
    }
    const owner = await Owner.findOne({ userId: req.user.id }).then(owner => {
        if(owner){
            return owner.populate('machines').populate('bookings').execPopulate();
        }
    }).catch(err => {
        console.log(err);
    });
    if(!owner) {
        return res.status(404).json({message: 'Owner not found'});
    }
    owner.accStatus = req.body.accStatus || owner.accStatus;
    owner.save().then(owner => {
        res.status(200).json({message: 'Owner updated', owner});
    }).catch(err => {
        console.log(err);
    });
});

//@desc Delete owner
//@route DELETE /api/owner/
//@access Public
const deleteOwner = asyncHandler(async (req, res) => {
    if(req.user.role !== 'owner'){
        return res.status(401).json({message: 'Unauthorized'});
    }
    const owner = await Owner.findOne({ userId: req.user.id });
    if(!owner) {
        return res.status(404).json({message: 'Owner not found'});
    }
    await owner.deleteOne();
});

module.exports = { getOwner, createOwner, updateOwner, deleteOwner };
