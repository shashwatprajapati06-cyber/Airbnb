const path = require("path");
const fs = require("fs");

const dataPath = path.join(__dirname, "../data/booking.json");
module.exports = class Booking{
    constructor(date, days,persons,id){
this.date = date;
this.days = days;
this.persons = persons;
this.id = id
    }
  save(){
    const bookings = Booking.fetchAll();
    bookings.push(this);
    fs.writeFileSync(dataPath,JSON.stringify(bookings,null,2))
}

 static  fetchAll(){
    try {
        const fileContent =  fs.readFileSync(dataPath,"utf-8")
        if(!fileContent) return [];
        return JSON.parse(fileContent);

           
        
    } catch {
        return [];
    }
 }
    
}