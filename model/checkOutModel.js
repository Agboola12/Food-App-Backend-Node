const  mongoose  = require('mongoose');

const checkOutSchema = mongoose.Schema({
    stateAddress: String,
        homeAddress : String,    
        cardName : String,
        creditCard: String,
        expiry : String,
        cardPassword: String,
        time: String,
        // userId: String,
        // foodName: String,
        // foodPrice: String,
        // foodQuantity: String,
        products: Array,
        userId: String,
        userfirstname: String
})




    

const CheckOut = mongoose.model("checkOut", checkOutSchema);

module.exports = CheckOut