const Home = require('../models/home');
const path = require('path');   
const fs = require('fs');

exports.getAddHome = (req,res)=>{
       res.render('host/add-home',{pageTitle:'airbnb home'})
   }

   exports.getHostHomes = (req, res, next) => {
    const registeredHomes = Home.fetchAll();
    res.render("host/host-home-list", { registeredHomes: registeredHomes, pageTitle: " Home List" })
  }
  
   exports.postAddHome = (req, res) => {
    const {homeName, price , location, rating, photoUrl} = req.body;
    const home = new Home (homeName, price, location, rating, photoUrl);
      home.save();

      res.sendFile(path.join(__dirname,'../views/host/homeadded.html'))

  }



