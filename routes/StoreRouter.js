const express = require("express");
const router = express.Router();

const storeController = require("../controllers/storeController");

// because app.use("/store", storeRouter)
router.get("/homes", storeController.getHomes);
router.get("/", storeController.getIndex);
router.get("/home-list/:id", storeController.getHomeDetails);
router.get("/favourite-list/:id", storeController.getFavouriteList);
router.get("/wishlist", storeController.getWishlist);
router.get("/booking/:id",storeController.getBookingform)
router.post("/bookings",storeController.postBookings)

module.exports = router;
