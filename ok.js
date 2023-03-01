const express = require('express');
const { default: mongoose } = require('mongoose');
const mongodb = require('mongoose');

const app = express();
app.listen(9000);
console.log("Server started");
app.use(express.json());

let db_link = 'mongodb+srv://king:king@gist001.xtt8zeu.mongodb.net/test';
mongoose.connect(db_link)
.then(function(e){
    console.log("Connected to DataBase");
})
.catch(function(err){
    console.log(err);
})


const admin = express.Router();
app.use('/admin',admin);

admin
.route('/')
.get(getUser)
.post(postUser)

function getUser(req,res){
    
}
function postUser(req,res){
    console.log("Post Function");
}

