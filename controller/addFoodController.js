const AddFood = require("../model/addFoodModel");
const User = require("../model/foodModel");

// Adding food 
const addfood = (req, res) => {
    // console.log("path");
    const { foodname, price, quantity } = req.body;
    const { path } = req.file;
    console.log(req.body);
    AddFood.create({ foodname, price, quantity, imageLink: path })
        .then(data => {
            res.json({
                success: true,
                message: "Admin add food successful",
                // data
            })
        }).catch(err => {
            res.status(400).json({
                success: false,
                message: "An error in adding"
            })
            console.log(err, "adding food problem");
        })
}

// getting all food
    const getfood = (req, res) => {
        AddFood.find({})
            .then(data => {
                if (data) {
                    res.status(200).send({
                        success: true,
                        message: "successful in getting food",
                        data
                    })
                }
            }).catch(err => {
                    res.status(500).send({
                        success: false,
                        message: "not successful in getting food",
                    })
                
                console.log(err, "getting all food");
            })
}

// deleting food ordered one by one
const RemoveFoodCart = (req, res) => {
    const {data,userId}=req.body;
    // console.log(req.body.data)

    User.findByIdAndUpdate(userId,{array_of_order:data}).
    then(data => {
        // console.log(data)
                res.status(200).send({
                    success: true,
                    message: "successful in deleting one food ordered by user",
                    data
                })
            })
            .catch(err => {
                res.status(500).send({
                    success: false,
                    message: "not successful deleting one food ordered by user",
                })
                console.log(err, "problem in deleting food ordered");
            })
}

const foodTransaction = (req, res)=>{
    
}

module.exports = { addfood, getfood, RemoveFoodCart  }