const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const AdminFood = require("../model/adminModel");

// Registering User
const adminRegister = async(req, res) => {
    const { firstname, email, password, phonenumber, address } = req.body;
    // console.log(req.body);
    const alReadyexist= await AdminFood.findOne({email});
    if (alReadyexist){
       return res.status(200).json({
            message:"email already exist",
            status:false
        })
    }
    AdminFood.create({ firstname, email, password, phonenumber, address })
        .then(data => {
            res.json({
                status: true,
                message: "User registration successful",
                // data

            })
        }).catch(err => {
            res.status(400).json({
                status: false,
                message: "An error"
            })
            console.log(err, "wahala o");
        })
}

const AdminLogin = (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    AdminFood.findOne({ email }).select("+password").exec()
        .then(async data => {
            if (data) {
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
                            status: true,
                            message: "admin login successful",
                            data: { email: req.body.email }
                        })
                    }
                    else {
                        res.status(200).json({
                            status: false,
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
                    status: false,
                    message: "email does not match "
                })
            }
        }).catch(err => {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: err
                })
                console.log(err);
            }
        })

}

const getAdmin = async (req, res) => {
    // res.send("profile is here");
    let data = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    // console.log(data)

    if (!data) {
        res.send({ message: "Invalid token", status: false })
    } else {
        AdminFood.findById(data._id)
            .then(data => {
                res.json({
                    status: true,
                    data,
                    message: "Admin profile fetched"
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: false,
                    message: "An error occurres when fetching Admin profile"
                })
                console.log(err, "Problem getting Admin");
            })
    }
}

module.exports = {adminRegister, AdminLogin, getAdmin};