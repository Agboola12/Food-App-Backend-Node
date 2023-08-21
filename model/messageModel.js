const { genSalt, hash } = require('bcrypt');
const  mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    userFirstname: String,
    userLastname: String,
    image:{
        type:String,
        require:true
    },
    userid:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    to:{
        type:String,
        require:true
    },
    from:{
        type:String,
        require:true
    }
    
}, {timestamps:true})


module.exports = mongoose.model("message", userSchema);
