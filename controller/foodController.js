const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../model/foodModel");
const AddFood = require("../model/addFoodModel");
const {handleUpload} =require('../upload')

// Registering User
const register =async (req, res) => {
    const cldRes = await handleUpload(req);

  
    const { firstname, lastname, email, password, phonenumber, address } = req.body;
    const alReadyexist= await User.findOne({email});
    if (alReadyexist){
       return res.status(200).json({
            message:"email already exist",
            success:false
        })
    }
    User.create({ firstname, lastname, email, password, phonenumber, address, imageLink: cldRes?.secure_url })
        .then(data => {
            res.json({
                success: true,
                message: "User registration successful",
                // data

            })
        }).catch(err => {
            res.status(400).json({
                success: false,
                message: "An error"
            })
            console.log(err, "wahala o");
        })
}

// const adminLogin = (req,res)=>{
//     const { email, password } = req.body;
//     if(email==='ola@gmail.com' && password==='1234567890'){
//             res.status(200).json({
//                 message:'successfully login',
//                 status:true,
//                 token:email,
//             })
//     }else{
//         res.status(200).json({
//             message:"invalid password or email",
//             status:false
//         })
//     }
// }

// Login User

const login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }).select("+password").exec()
        .then(async data => {
            if (data) {
                // console.log(data)
                try {
                    const validPassword = await compare(password, data.password)
                    if (validPassword) {
                        // jsonwebtoken
                        const token = jwt.sign({
                            email: data.email,
                            _id: data._id
                        },
                            process.env.JWT_SECRET,
                            { expiresIn: "12h" }
                        )
                        data.password = "";
                        res.json({
                            token,
                            success: true,
                            message: " login successful",
                            data: { email: req.body.email }
                        })
                    }
                    else {
                        res.status(200).json({
                            success: false,
                            message: "email or passwprd is not correct"
                        })
                    }
                }
                catch (error) {
                    res.send(error)
                    console.log(error);
                }
            }
            else {
                res.status(200).json({
                    success: false,
                    message: "email does not match "
                })
            }
        }).catch(err => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err
                })
                console.log(err);
            }
        })

}


const getUser = async (req, res) => {
    // res.send("profile is here");
    let data = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    if (!data) {
        res.send({ message: "Invalid token", status: false })
    } else {
        User.findById(data._id)
            .then(data => {
                res.json({
                    success: true,
                    data,
                    message: "User profile fetched"
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    message: "An error occurres when fetching user profile"
                })
                console.log(err, "Problem getting user");
            })
    }
}

const userProfile = (req, res) => {
    const { email } = req.query;
    User.findOne({ email })
        .then(user => {
            // console.log(user);
            if (user) {
                res.status(200).send({
                    success: true,
                    message: "successful",
                    user
                })
            }
        })
        .catch(err => {
            res.send({
                success: false,
                message: "not successful",
            })
            console.log(err);
        })
}

// getting all food
const users = (req, res) => {
    User.find({})
        .then(data => {
            if (data) {
                res.status(200).send({
                    success: true,
                    message: "successful in getting users",
                    data
                })
            }
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: "not successful in getting users",
            })

            console.log(err, "getting all user");
        })
}

// deleting user from admin side
const delUser = (req, res) => {
    const { _id } = req.params;

    User.deleteOne({ _id })
        .then(data => {
            res.status(200).send({
                success: true,
                message: "successful in getting users",
                data
            })
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: "not successful in getting users",
            })
            console.log(err, "problem in deleting users");
        })
}

// getting the food ordered
const userGetFood = (req, res) => {
    const { _id } = req.params;

    AddFood.findOne({ _id })
        .then(data => {
            res.status(200).send({
                success: true,
                message: "successful in users food ordering ",
                data
            })
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: "not successful in users food ordering ",
            })
            console.log(err, "problem in users food ordering ");
        })
}

// food ordering
const userOrder = async (req, res) =>{
    let data = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    // console.log(req.body.data)
    if(req.body.data.status){
        User.findOne({  _id:data._id }).then((user)=>{
            let array_of_order=user.array_of_order.map((val)=>{
                if(val.id==req.body.data.id){
                    val.number+=1;
                }
                return val;
            });
            User.findOneAndUpdate({  _id:data._id },{ array_of_order})
            .then(data => {
                res.json({
                    success: true,
                    message: "User registration successful",
                })
            }).catch(err => {
                res.status(400).json({
                    success: false,
                    message: "An error"
                })
                console.log(err, "wahala o");
            })

        }).catch(err => {
            res.status(400).json({
                success: false,
                message: "An error"
            })
            console.log(err, "wahala o");
        })

    }else{
        User.findOneAndUpdate({  _id:data._id },{$push:{ array_of_order:{id:req.body.data.id,number:1}}})
            .then(data => {
                res.json({
                    success: true,
                    message: "User registration successful",
                })
            }).catch(err => {
                res.status(400).json({
                    success: false,
                    message: "An error"
                })
                console.log(err, "wahala o");
            })
    }
}
// editing user profile
const editUser = (req, res) => {
    const { _id } = req.params;
    // console.log(req.body); 
    const { firstname, lastname, email, phonenumber, address } = req.body;
    console.log(req.body);
   
    User.findByIdAndUpdate(_id,{ firstname, lastname, email, phonenumber, address })
        .then(data => {
            res.json({
                success: true,
                message: "User editing successful",
                // data

            })
        }).catch(err => {
            res.status(400).json({
                success: false,
                message: "An error in editing profile"
            })
            console.log(err, "wahala o in editing profile");
        })
}






module.exports = { register, login, getUser, userProfile, users, delUser, userGetFood, userOrder, editUser }