const express = require('express');

const app = express();

app.listen(3000);

app.get('/',(req,res)=>{
    res.sendFile('./new/one.html',{root:__dirname});
});

app.get('/about',(req,res)=>{
    // res.send("About page");
    res.write("About page by write command");
    res.end();
})


app.get('/non',(req,res)=>{
    console.log("Haii");
    res.send("non called");
})
