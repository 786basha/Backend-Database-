const express = require('express');
const app = express();

app.use(express.json());
app.listen(3000);

const auth = express.Router();

app.use('/signup',auth);

auth
.route('/')
.get(getSignup)
.post(postSignup)


function getSignup(req,res){
    res.sendFile('/new/signup.html',{root:__dirname});
    console.log("Get signup started");
}

function postSignup(req,res){
    let obj = req.body;
    console.log(obj);
    res.json({
        message:"Post generated",
        data:obj
    })
}