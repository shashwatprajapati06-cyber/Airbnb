const express = require("express");
const router = express.Router();

const storecontroller = require("../controller/storecontroller");

// because app.use("/store", storeRouter)
router.get("/homes", storecontroller.getHomes);
router.get("/", storecontroller.getIndex);
router.get("/home-list/:id", storecontroller.getHomeDetails);
router.get("/favourite-list/:id", storecontroller.getFavouriteList);
router.get("/wishlist", storecontroller.getWishlist);
router.get("/booking/:id",storecontroller.getBookingform)
router.post("/bookings",storecontroller.postBookings)

module.exports = router;
