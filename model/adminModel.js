const { genSalt, hash } = require('bcrypt');
const  mongoose  = require('mongoose');

const AdminFoodSchema = mongoose.Schema({
    firstname: String,
    email: {
        type: String,
        unique: true
    },
    phonenumber: Number,
    address : String,
    password: {
        type: String,
        select : false
    },
})




AdminFoodSchema.pre("save", async function (next) {
    const salt = await genSalt(10);
    console.log(this.password)
    this.password = await hash(this.password, salt)
    next();
})

const AdminFood = mongoose.model("AdminFood", AdminFoodSchema);

module.exports = AdminFood