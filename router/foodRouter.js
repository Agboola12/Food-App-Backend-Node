const express = require('express');
const rout = express.Router();
const {upload} = require('../upload')

const { register, login, getUser, users, userGetFood, userOrder, delUser, editUser } = require('../controller/foodController.js');
const { verifyUser } = require('../middlewares/authMiddleware.js');
const { addfood, getfood, RemoveFoodCart } = require('../controller/addFoodController.js');
const { foodOrdered, usersTransaction, userHistory, ClearCart } = require('../controller/checkOutController.js');
const { adminRegister, AdminLogin, getAdmin } = require('../controller/adminController.js');
const { sendMessage,recieveMessage, getChat } = require('../controller/chatController.js');

rout.post("/register",upload.single('picture'), register )


rout.post("/login", login )


rout.get("/getUser",verifyUser, getUser)
rout.post("/addfood",upload.single("picture"), addfood)
rout.get("/getfood", getfood )
rout.delete("/delUser/:_id", delUser )
rout.get("/users", users )
rout.get("/userGetFood/:_id", userGetFood)
rout.post("/userOrder", userOrder)
rout.patch("/delFood", RemoveFoodCart)
rout.patch("/editUser/:_id", editUser)
rout.post("/foodOrdered", foodOrdered)
rout.get("/usersTransaction", usersTransaction)
rout.post("/userHistory", userHistory)
// rout.post("/adminLogin", adminLogin)
rout.post ("/ClearCart", ClearCart)

// admin
rout.post("/adminRegister", adminRegister )
rout.post("/adminLogin", AdminLogin )
rout.get("/getAdmin",verifyUser, getAdmin )





// chat
rout.post("/chat", sendMessage) 
rout.get("/chat", recieveMessage) 
rout.post("/getChat", getChat ) 


module.exports = {rout}
