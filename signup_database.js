const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
app.listen(3000);

const auth = express.Router();

app.use('/signup',auth);

auth
.route('/')
.get(getSignup)
.post(postSignup)

let db_link = 'mongodb+srv://admin:king@cluster0.bu1zeiv.mongodb.net/test';
mongoose.connect(db_link)
.then(function(db){
    console.log("Connected to data base");
})
.catch(function(err){
    console.log(err);
})

function getSignup(req,res){
    res.sendFile('/new/signup.html',{root:__dirname});
    console.log("Get signup started");
}

async function postSignup(req,res){
    // let obj = req.body;
    console.log("own try for backend response");
    let ob = req.body;
    let obj = await SignupModel.create(ob);
    console.log(obj);
    res.json({
        message:"Post generated",
        data:obj
    })
}


const DataSchema = mongoose.Schema({
    name:{
        type:String

    },
    mail:{
        type:String
    },
    number:{
        type:Number
    }
})


const SignupModel = mongoose.model('SignupModel',DataSchema);









