const Chat = require("../model/messageModel");


const sendMessage = (req, res) =>{
    // console.log(req.body)
    Chat.create(req.body)
    .then(data => {
        res.json({
            status: true,
            message: "User chat saved",
            messages:data
        })
    })
    .catch(err=>{
        res.status(400).json({
            status: false,
            message: "chat not saving successful"
        })
        console.log(err);
    })
}

const recieveMessage = (req, res) =>{
    const {userId ,single}=req.query
    const data= userId && single=='true'?{
        $or:[{userid:userId},{
        to:userId}]}:{}
    
    Chat.find(data)
    .then(data => {
        // console.log(data)
        res.json({
            status: true,
            message: "User chat saved",
            messages:data
        })
    })
    .catch(err=>{
        res.status(400).json({
            status: false,
            message: "chat not saving successful"
        })
        console.log(err.message);
    })
}

const getChat = (req, res)=>{
    const {aa} = req.body;
    // console.log(aa);
    Chat.find({userid : aa})
        .then(data => {
            if (data) {
                // console.log(data);
                res.status(200).json({
                    status: true,
                    message: "successful in getting users chat message",
                    data
                })
            }
        }).catch(err => {
            res.status(500).json({
                status: false,
                message: "not successful in getting users chat message",
            })

            console.log(err, "error in  getting users chat message");
        })
}

module.exports ={sendMessage,recieveMessage, getChat}

