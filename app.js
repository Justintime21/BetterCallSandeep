const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const port=80;
const bodyparser=require('body-parser');
// this is for backend
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/sandeeplaw');
}

// Defining mongoose schema 
const contactSchema = new mongoose.Schema({
    name: String,
    num1:Number,
    gender:String,
    address:String,
    message:String
  });

//   definign mongoose model 
const contact=mongoose.model('contact',contactSchema);


//Express specific stuff 
app.use('/static',express.static('static'));// for serving static files
app.use(express.urlencoded());

//PUG specific stuff
app.set('view engine',' pug')// setting the template engine to pug
app.set('views',path.join(__dirname,'views'));//setting views directory


//endpoints
app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
});
// now if we want to use post in mongooose we have to install body-parser 

app.post('/contact',(req,res)=>{
    // so when someone will make a post request on contact then 
    // we will create a new contact body with the info that was fed into the body 
    var myData= new contact(req.body);
    myData.save().then(()=>{ // we have to use then function since  is asyncronus
        res.send('this item has been saved to the database');
    }).catch(()=>{
        res.status(400).send(' there was an error');
    });
    // res.status(200).render('contact.pug',myData);
});
//start the server
app.listen(port,()=>{
    console.log(`the application is running on ${port}`);
});
