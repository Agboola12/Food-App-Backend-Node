const { genSalt, hash } = require('bcrypt');
const  mongoose  = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
        
    },
    phonenumber: Number,
    address : String,
    imageLink: String,
    imagePath: String,
    array_of_order:[],
    password: {
        type: String,
        select : false
    },
})




    userSchema.pre("save", async function (next) {
        const salt = await genSalt(10);
        console.log(this.password)
        this.password = await hash(this.password, salt)
        next();
    })

const User = mongoose.model("user", userSchema);

module.exports = User