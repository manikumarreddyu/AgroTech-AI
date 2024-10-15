const asyncHandler = require('express-async-handler');
const Img = require('../models/image');
const Machine = require('../models/machine');
const multer = require('multer');
const { response } = require('express');
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const getImagesByMachineId = async (req, res) => {
  const { machineId } = req.query; // Get the machineId from query parameters
  try {
      // Fetch images associated with the given machineId
      const images = await Image.find({ machineId });
      
      if (!images || images.length === 0) {
          // If no images are found, return a 404 error
          return res.status(404).json({ message: "Image not found" });
      }

      res.status(200).json(images);
  } catch (error) {
      console.error("Error fetching images:", error);
      // If an internal error occurs, return a 500 status code
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

//@desc Get all Imgs
//@route GET /api/image/all
//@access Private
const getImgs = asyncHandler(async (req, res) => {
    const { machineId } = req.query;
    console.log(machineId);
    const imgs = await Img.find( {machineId} );
    res.status(200).json(imgs);    
});

//@desc Get Img by ID
//@route GET /api/Img/
//@access Private
const getImg = asyncHandler(async (req, res) => {
    const { imgId } = req.body;
    const img = await Img.findById(imgId);
    if(!img){
        throw new Error('Image not found');
    }
    res.status(200).json({ message : "Success",img});
});

//@desc Register Img
//@route POST /api/Img
//@access Public
const createImg = asyncHandler(async (req, res) => {
    try {
        const { machineId } = req.body;
        // Extract image data from the request files array
        const images = req.files.map(file => ({
          machineId,
          filename: file.filename,
          contentType: file.mimetype,
          data: file.buffer
        }));
    
        // Create an array to store all the new image documents
        const newImages = [];
    
        // Iterate over each image and create a new Img document for it
        for (const image of images) {
          const newImg = new Img(image);
          let imgId = newImg._id;
          // update machine add imgId
          const machine = await Machine.findById(machineId);
          console.log(machineId,machine);
          // Initialize imgIds array if it doesn't exist
            if (!machine.img) {
                machine.img = [];
            }
            
            // Push the imgId into the imgIds array
            machine.img.push(imgId);
          await machine.save();
          await newImg.save();
          newImages.push(newImg);
        }
    
        res.status(201).json({ message : 'Images uploaded successfully' , newImages});
       } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

//@desc Delete Img
//@route DELETE /api/Img/
//@access Public
const deleteImg = asyncHandler(async (req, res) => {
    const { imgId } = req.body;
    const img = await Img.findById(imgId);
    if(!img){
        throw new Error('Image not found');
    }

    // remove img from machine
    const machine = await Machine.findById(img.machineId);
    machine.img = machine.img.filter((id) => id !== imgId);
    await machine.save();

    await img.remove();
    res.status(200).json({ message : "Image deleted successfully"});
});

module.exports = { getImgs, getImg, createImg, deleteImg, getImagesByMachineId };