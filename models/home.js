const path = require("path");
const fs = require("fs");

const dataPath = path.join(__dirname, "../data/homes.json");

module.exports = class Home {
  constructor(homeName, price, location, rating, photoUrl) {
    this.id = Math.random().toString();
    this.homeName = homeName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    const homes = Home.fetchAll();
    homes.push(this);

    fs.writeFileSync(dataPath, JSON.stringify(homes, null, 2));
  }

  static fetchAll() {
    try {
      const fileContent = fs.readFileSync(dataPath, "utf-8");
      if (!fileContent) return [];
      return JSON.parse(fileContent);
    } catch {
      return [];
    }
  }

  // 🔥 FIXED: returns OBJECT, not array
  static findById(homeId) {
    const homes = Home.fetchAll();
    
    return homes.find(home => home.id === homeId);

  }
};
