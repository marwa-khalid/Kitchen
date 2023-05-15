//create routes for fuctions to accept requests
//project has many entities
//different requests have different url , different url have different handlers

const express = require('express');
const multer = require('multer');
const bcrypt = require("bcryptjs");
//need router from express
//it will specify all urls
const router = express.Router();

//get handle of schema, get access of js file
const Food = require('../structure/detail');
const Chef = require('../structure/chef')

// //storage
// const Storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//       cb(null,'./public/uploads')
//     },
//     filename: (req, file, cb)=>{
//         cb(null,file.fieldname+ "_" + Date.now() + "_" + file.originalname)
//     },
// })
  
// const upload = multer({
//     storage: Storage
// }).single('image')

//async will not lock process
//get all records
router.get('/', async(req,res)=>{
    //fetch all food and send
    try{
        //await for async return
        const food = await Food.find()
        //send in json format.. .send will send in text form
        res.json(food)
        console.log("Get Request Worked")
    }
    catch(err){
        res.send('Error: ' + err)
    }
})

router.get('/', async(req,res)=>{
    //fetch all food and send
    try{
        //await for async return
        const chef = await Chef.find()
        //send in json format.. .send will send in text form
        res.json(chef)
        console.log("Get Request Worked")
    }
    catch(err){
        res.send('Error: ' + err)
    }
})

//get single record
router.get('/:id', async(req,res)=>{
    //fetch one food item and send
    try{
        //await for async return
        const food = await Food.findById(req.params.id)
        //send in json format.. .send will send in text form
        res.json(food)
        console.log("Get Request by ID Worked")
    }
    catch(err){
        res.send('Error: ' + err)
        console.log("didnt work")
    }
})

//insert data in database
router.post("/", async function (req, res, next) {
    let food = new Food(req.body);
    await food.save();
    res.send(food);
  });

//update/patch a record
router.patch('/:id',  async(req,res) =>{
    const food  = await Food.findById(req.params.id)

    food.name = req.body.name
    food.price = req.body.price
    food.description = req.body.description
    
    food.save((err) =>{
        if(err) {
            res.send(err)
            console.log("Can't update data: " + err)
        } 
        else {
            //display in json format
            res.json(food)
            console.log("Data Updated")
        }
    })   
})

//delete a record
router.delete('/:id', async(req,res) =>{
    const food  = await Food.findById(req.params.id)
    
    food.remove(err =>{
        if(err) {
            res.send(err)
            console.log("Can't delete record: " + err)
        } 
        else {
            //display in json format
            res.json("Record Deleted")
            console.log("Record Deleted")
        }
    })  
})

//Authentication routes

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    // Check if chef already exists
    const existingChef = await Chef.findOne({ email });
    if (existingChef) {
      return res.status(400).json({ message: 'Chef already exists' });
    }
  
    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create new chef
    const chef = new Chef({
      username,
      email,
      password:hashedPassword,
    });
  
    // Save chef to database
    await chef.save();
  
    res.status(201).json({ message: 'Chef registered successfully' });
  });
  
  router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;
  
    // Check if chef exists
    const chef = await Chef.findOne({ email });
    if (!chef) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }
  
    // Check password
    const isPasswordMatch = await bcrypt.compare(password, chef.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }
  
    // Create and send JWT token
    const token = { email: email };
    
    res.status(200).json({ message: 'Logged in successfully', token });
  });

//export module router
//it will be accesible in app.js
module.exports = router;
