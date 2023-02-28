const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
app.listen(3000);

// let users = [
//     {
//         'id':1,
//         'name':"Basha"
//     },
//     {
//         'id':2,
//         'name':"King"
//     },
//     {
//         'id':3,
//         'name':"Bhanu"
//     },
//     {
//         'id':4,
//         'name':"Suku"
//     },
// ]

const userRouter = express.Router();
const auth = express.Router();

app.use('/user',userRouter);
app.use('/login',auth);

userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserById)

auth
.route('/')
.get(getSignup)
.post(postSignup)


app.get('/',(req,res)=>{
    console.log(req.query);
    // res.send(users);
    // console.log(users);
})

app.post('/',(req,res)=>{
    users=req.body;
    res.json({
        postMessage:"Data added",
        user:req.body
    })
    console.log(req.body);
})

app.patch('/',(req,res)=>{
    res.send("Patching data DONE ");
    let update = req.body;
    for(key in update){
        users[key]=update[key];
    }
})

app.delete('/',(req,res)=>{
    users={};
    res.send("Deleted");
})

app.get('/user/:id',(req,res)=>{
    console.log(req.params);
    let paramId = req.params.id;
    let obj = {};
    for(let i = 0 ; i < users.length ; i++){
        if(users[i]['id']==paramId){
            obj=users[i];
        }
    }
    res.write("User data by id");
    // res.json({
    //     message:"User data by id",
    //     data:obj
    // })
    if(paramId==1){
        res.write("Page 1 selected");
        res.end();
    }
    console.log(obj);
})


async function getUser(req,res){
    let allusers = await userModel.find();
    res.json({
        message:"All users data obtained",
        data:allusers
    })
}

function postUser(req,res){
    users=req.body;
    res.json({
        message:"Posted data",
        user:req.body
    })
    console.log("Data posted successfully");
}

function updateUser(req,res){
    let dataToUpdate = req.body;
    for(key in dataToUpdate){
        users[key]=dataToUpdate[key]
    }
    console.log("Data Updated successfully (Patch)");
}

function deleteUser(req,res){
    users={}
    console.log("Deleted users data success");
}

function getUserById(req,res){
    console.log(req.params);
    let paramId = req.params.id;
    let obj = {};
    for(let i = 0 ; i < users.length ; i++){
        if(users[i]['id']==paramId){
            obj=users[i];
        }
    }
    res.json({
        message:"User data by id",
        data:obj
    })
    if(paramId==1){
        res.write("Page 1 selected");
        res.end();
    }
    console.log(obj);
}

function middleware(req,res,next){
    console.log("Middleeare called");
    next();
}

function getSignup(req,res){
   console.log("Login");
    // console.log("Get Signup called");
    // res.sendFile('/new/signup.html',{root:__dirname})
}

async function postSignup(req,res){
    console.log("Signup called");
    let usrobj = req.body;
    let obj = await userModel.create(usrobj);
    console.log("backend",obj);
    res.json({
        message:"User signed up",
        data:obj
    })
}

const db_link = 'mongodb+srv://admin:king@cluster0.bu1zeiv.mongodb.net/test';
mongoose.connect(db_link)
.then(function(db){
    console.log("Connected db");
})
.catch(function(err){
    console.log(err);
});

mongoose.set('strictQuery', false);
const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
    }
});

const userModel = mongoose.model('userModel',userSchema);

(async function createUser(){
    let user={
        name:'suku',
        email:'basha@gmail.com',
        password:'KING'
    }
    // let data =await userModel.create(user);
    // console.log(data);
})();
