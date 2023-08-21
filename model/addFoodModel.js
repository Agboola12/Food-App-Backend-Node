const  mongoose  = require('mongoose');

const addFoodSchema = mongoose.Schema({
    foodname: String,
    price: String,
    quantity: String,
    imageLink: String,
    // imagePath: String,
})




    

const AddFood = mongoose.model("addFood", addFoodSchema);

module.exports = AddFood