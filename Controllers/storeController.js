const Home = require("../models/home");
const Booking = require("../models/booking")
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

    // 1️⃣ Get the clicked home
    const home = Home.findById(homeId);
    if (!home) {
      return res.status(404).send("Home not found");
    }

    // 2️⃣ Wishlist file path
    const dataPath = path.join(__dirname, "../data/wishlist.json");

    let wishlist = [];

    // 3️⃣ Read wishlist safely
    try {
      const fileContent = await fs.readFile(dataPath, "utf-8");
      wishlist = JSON.parse(fileContent);
      if (!Array.isArray(wishlist)) wishlist = [];
    } catch {
      wishlist = [];
    }

    // 4️⃣ Check if already favourite
    const isAlreadyFavourite = wishlist.some(
      item => item && item.id === homeId
    );

    // 5️⃣ Add only if not present
    if (!isAlreadyFavourite) {
      wishlist.push(home);
    }

    // 6️⃣ Save wishlist
    await fs.writeFile(
      dataPath,
      JSON.stringify(wishlist, null, 2)
    );

    // 7️⃣ Go back to SAME page
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

  res.render("store/home-detail", {
    home,
    homeId,
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

exports.getBookingform = async (req,res)=>{
  
  const homeId = req.params.id;
    const home =  Home.findById(homeId)
      

  res.render("store/bookingform",{home, pageTitle:" My Bookings"});
  }

  exports.postBookings =  (req,res)=>{
  // res.render("store/bookings",{pageTitle:" My Bookings"})
 
  const {date, days,persons,id} = req.body;
     const home =  Home.findById(id)
  const booking = new Booking(date,days,persons,id)
  booking.save()
  console.log(booking) 

res.render("store/bookings",{home,booking,pageTitle:"my bookings"})
  }




