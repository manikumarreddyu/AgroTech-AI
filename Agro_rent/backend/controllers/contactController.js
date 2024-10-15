const asyncHandler = require('express-async-handler');
const Contact = require('../models/contact');

//@desc Get all Contacts
//@route GET /api/contact
//@access Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);    
});

//@desc Get Contact by ID
//@route GET /api/contact/
//@access Private
const getContact = asyncHandler(async (req, res) => {
    const { contactId } = req.body;
    const contact = await Contact
    .findById(contactId)
    .select('name mobile message date');
    if(!contact){
        throw new Error('Contact not found');
    }
    res.status(200).json({ message : "Success",contact});
});

//@desc Register Contact
//@route POST /api/contact
//@access Public
const createContact = asyncHandler(async (req, res) => {
    try {
        const { name, mobile, message } = req.body;
        console.log(req.body);
        const contact = new Contact({ name, mobile, message });
        await contact.save();
        res.status(201).json({ message : 'Contact created successfully' , contact});
       } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//@desc Update Contact
//@route PUT /api/contact
//@access Private
const updateContact = asyncHandler(async (req, res) => {
    try {
        const { contactId, name, mobile, message } = req.body;
        const contact = await Contact.findById(contactId);
        if(!contact){
            throw new Error('Contact not found');
        }
        contact.name = name;
        contact.mobile = mobile;
        contact.message = message;
        await contact.save();
        res.status(200).json({ message : 'Contact updated successfully' , contact});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//@desc Delete Contact
//@route DELETE /api/contact/
//@access Private
const deleteContact = asyncHandler(async (req, res) => {
    const { contactId } = req.body;
    const contact = await Contact
    .findById(contactId);
    if(!contact){
        throw new Error('Contact not found');
    }
    await contact.remove();
    res.status(200).json({ message : 'Contact deleted successfully'});
});


module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};
