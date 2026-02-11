const Home = require("../models/home");
const Booking = require("../models/booking");
const path = require("path");
const fs = require("fs/promises");


/* ---------------- HOME LIST ---------------- */
exports.getHomes = async (req, res) => {
  const dataPath = path.join(__dirname, "../data/wishlist.json");

  let wishlist = [];
  try {
    const fileContent = await fs.readFile(dataPath, "utf-8");
    wishlist = JSON.parse(fileContent);
    if (!Array.isArray(wishlist)) wishlist = [];
  } catch {
    wishlist = [];
  }

  const registeredHomes = Home.fetchAll();

  res.render("store/home-list", {
    registeredHomes,
    wishlist,
    pageTitle: "Home List"
  });
};


/* ---------------- INDEX PAGE ---------------- */
exports.getIndex = async (req, res) => {
  const dataPath = path.join(__dirname, "../data/wishlist.json");

  let wishlist = [];
  try {
    const fileContent = await fs.readFile(dataPath, "utf-8");
    wishlist = JSON.parse(fileContent);
    if (!Array.isArray(wishlist)) wishlist = [];
  } catch {
    wishlist = [];
  }

  const registeredHomes = Home.fetchAll();

  res.render("store/index", {
    registeredHomes,
    wishlist,
    pageTitle: "Home List"
  });
};


/* ---------------- ADD TO FAVOURITE ---------------- */
exports.getFavouriteList = async (req, res, next) => {
  try {
    const homeId = req.params.id;
    const home = Home.findById(homeId);

    if (!home) {
      return res.status(404).send("Home not found");
    }

    const dataPath = path.join(__dirname, "../data/wishlist.json");

    let wishlist = [];
    try {
      const fileContent = await fs.readFile(dataPath, "utf-8");
      wishlist = JSON.parse(fileContent);
      if (!Array.isArray(wishlist)) wishlist = [];
    } catch {
      wishlist = [];
    }

    const isAlreadyFavourite = wishlist.some(
      item => item && item.id === homeId
    );

    if (!isAlreadyFavourite) {
      wishlist.push(home);
    }

    await fs.writeFile(
      dataPath,
      JSON.stringify(wishlist, null, 2)
    );

    res.redirect(req.get("referer"));

  } catch (error) {
    next(error);
  }
};


/* ---------------- HOME DETAILS ---------------- */
exports.getHomeDetails = (req, res) => {
  const homeId = req.params.id;
  const home = Home.findById(homeId);

  if (!home) {
    return res.status(404).send("Home not found");
  }

  // 🔥 IMPORTANT FIX — Always send booking
  res.render("store/home-detail", {
    home,
    booking: null,
    pageTitle: "Home Details"
  });
};


/* ---------------- WISHLIST PAGE ---------------- */
exports.getWishlist = async (req, res) => {
  const dataPath = path.join(__dirname, "../data/wishlist.json");

  let wishlist = [];
  try {
    const fileContent = await fs.readFile(dataPath, "utf-8");
    wishlist = JSON.parse(fileContent);
    if (!Array.isArray(wishlist)) wishlist = [];
  } catch {
    wishlist = [];
  }

  res.render("store/wishlist", {
    wishlist,
    pageTitle: "My Wishlist"
  });
};


/* ---------------- BOOKING FORM ---------------- */
exports.getBookingform = (req, res) => {
  const homeId = req.params.id;
  const home = Home.findById(homeId);

  if (!home) {
    return res.status(404).send("Home not found");
  }

  res.render("store/bookingform", {
    home,
    pageTitle: "My Bookings"
  });
};


/* ---------------- POST BOOKING ---------------- */
exports.postBookings = (req, res) => {

  const { date, days, persons, id } = req.body;

  const home = Home.findById(id);

  if (!home) {
    return res.status(404).send("Home not found");
  }

  // Convert days & persons safely
  const safeDays = Number(days) || 1;
  const safePersons = Number(persons) || 1;

  const booking = new Booking(date, safeDays, safePersons, id);

  booking.save();

  console.log("Booking Saved:", booking);

  // Render page with booking data
  res.render("store/bookings", {
    home,
    booking,
    pageTitle: "My Bookings"
  });
};





