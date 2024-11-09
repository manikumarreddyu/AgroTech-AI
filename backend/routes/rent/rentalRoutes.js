const express = require("express");
const router = express.Router();

const {
  createRental,
  updateRental,
  cancelRental,
  viewRental,
  returnRental,
} = require("../../controllers/rent/RentalController");

router.post("/rentals", createRental);

router.put("/rentals/:rentalId", updateRental);

router.delete("/rentals/:rentalId", cancelRental);

router.get("/rentals/:rentalId", viewRental);

router.post("/rentals/:rentalId/return", returnRental);

module.exports = router;
