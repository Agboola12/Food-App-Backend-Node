const mongoose  = require('mongoose');

const chatSchema = mongoose.Schema({
    userId : String,
    userMessage: String,
    time: String,
})

    
const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;
