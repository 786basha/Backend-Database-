const express =require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.listen(3000);
console.log("Server started");

let db_link = 'mongodb+srv://king:king@gist001.xtt8zeu.mongodb.net/test';
mongoose.connect(db_link)
.then(function(db){
    console.log("Database connected");
})
.catch(function(err){
    console.log(err);
})

const auth = express.Router();
const home = express.Router();
app.use('/login',auth);
app.use('/admin',home);

home
.route('/basha')
.get(getUser)
.post(postUser)

auth
.route('/')
.get(getSignup)
.post(postSignup)
// .delete(delUser)


function getUser(req,res){
    console.log("Admin Router called");
    res.sendFile('/new/delete_cse.html',{root:__dirname});
}

async function postUser(req,res){
    let obj = req.body;
    let createdbobj = Trash_cse.create(obj);
    let dbobj = await DataBase_CSE.findOneAndDelete(obj);
    console.log(obj);
}

// async function delUser(req,res,){
//     let obj = req.body;
//     let dbobj = await DataBase_CSE.findOneAndDelete(obj);
// }

function getSignup(req,res){
    res.sendFile('/new/signup1.html',{root:__dirname});
    console.log("Get request generated");
}

async function postSignup(req,res){
    console.log("Post request generated");
    let obj = req.body;
    let dbobj = await DataBase_CSE.create(obj);
    console.log("DataBase Data updated :",dbobj);

}

// creating schemas for adding data to database

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    hall:{
        type:String,
        unique:true,
        require:true
    },
    pan:{
        type:String,
        unique:true,
        require:true
    },
    adar:{
        type:Number,
        unique:true,
        require:true
    }
})
const DataBase_CSE = mongoose.model('DataBase_CSE',userSchema);

const deleteSchema = mongoose.Schema({
    hall:{
        type:String,
        require:true
    }
})

const Trash_cse = mongoose.model('Trash_cse',deleteSchema);


