const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const CheckOut = require("../model/checkOutModel");
const User = require("../model/foodModel");
dotenv.config()

// Keeping the food ordered by the user
const foodOrdered = (req, res) => {
    const { stateAddress, homeAddress, cardName, creditCard, expiry, cardPassword, products, userId, userfirstname, date} = req.body;
    // console.log(req.body);
    CheckOut.create({ stateAddress, homeAddress, cardName, creditCard, expiry, cardPassword, products, userId, userfirstname, date })
        .then(data => {
            res.json({
                success: true,
                message: "User order checkout",
                // data

            })
        }).catch(err => {
            res.status(400).json({
                success: false,
                message: "An error in checkout"
            })
            console.log(err, "wahala o in checkout");
        })
}

const usersTransaction =(req, res) =>{
    CheckOut.find({})
        .then(data => {
            if (data) {
                res.status(200).send({
                    success: true,
                    message: "successful in getting users food transactions",
                    data
                })
            }
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: "not successful in getting users food transactions",
            })

            console.log(err, "erroroorr in  getting users food transactions");
        })
}

const userHistory =(req, res) =>{
    const {aa} = req.body;
    // console.log(req.body);
    CheckOut.find({userId : aa})
        .then(data => {
            if (data) {
                // console.log(data);
                res.status(200).json({
                    status: true,
                    message: "successful in getting users food history",
                    data
                })
            }
        }).catch(err => {
            res.status(500).json({
                status: false,
                message: "not successful in getting users food history",
            })

            console.log(err, "erroroorr in  getting users food history");
        })
}

const ClearCart =async(req, res)=>{
    const {aa} = req.body;
        User.findOneAndUpdate({
            _id:aa
        },{
            array_of_order:[]
        }).then((response)=>{
            console.log(response)
            res.status(200).json({
                message:"successfully updated",status:true
            })
        }).catch((_err)=>{
            res.status(200).json({
                message:"somethng went wrong",status:false
            })
        })
}

module.exports = { foodOrdered, usersTransaction, userHistory, ClearCart }
