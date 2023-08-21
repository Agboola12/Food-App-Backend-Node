const express = require("express");
const cors = require("cors");
const dotenv = require ("dotenv");
dotenv.config();
const { rout } = require("./router/foodRouter");
const app = express();
const path = require ('path');
const  mongoose  = require('mongoose');
const PORT = process.env.PORT || 4000;
app.use(cors());
const bodyParser = require('body-parser')
app.use(bodyParser.json({limit:'50mb'}));



// const sampleSchema = new mongoose.Schema({
//    name:{
//       type:String,
//       require: true
//    },
//    email:{
//       type:String,
//       require: true
//    }
// },{timestamps:true})
// const sampleModel = mongoose.model("samples", sampleSchema);
// module.exports = sampleModel;





mongoose.set('strictQuery', true)

mongoose.connect(process.env.URI).then(res =>{
   console.log("db connected");
}).catch(err =>{
   console.log( err.message );
})


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,'/assets')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use("/",rout )

app.listen(PORT, ()=>{
    console.log("My server is running on port "+ PORT)
})