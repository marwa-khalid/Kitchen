
const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const Food = require('../structure/detail');
const User = require('../structure/user')
const AsyncStorage = require('@react-native-async-storage/async-storage');

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
    try {
      const { fullName, email, address, phoneNumber, password, userType } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

     // Create a new user instance
     const user = new User({
        fullName,
        email,
        address,
        phoneNumber,
        password:hashedPassword,
        userType,
      });

      // Save the user to MongoDB
      await user.save();
  
      // Registration successful
      res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Error registering user:', error);

      res.status(500).json({ error: 'Registration failed' });
    }
  });

  
// router.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;
  
//     // Check if chef already exists
//     const existingChef = await Chef.findOne({ email });
//     if (existingChef) {
//       return res.status(400).json({ message: 'Chef already exists' });
//     }
//     // Encrypt password
//     const hashedPassword = await bcrypt.hash(password, 10);
  
//     // Create new chef
//     const chef = new Chef({
//       username,
//       email,
//       password:hashedPassword,
//     });
  
//     // Save chef to database
//     await chef.save();

//     const storeUserIdentifier = async (identifier) => {
//         try {
//           await AsyncStorage.setItem('chefId', identifier);
//           console.log('User identifier stored successfully.');
//         } catch (error) {
//           console.log('Error storing user identifier:', error);
//         }
//       };
  
  
//     res.status(201).json({ message: 'Chef registered successfully' });

//     const chefId = chefId; 
//     storeUserIdentifier(chefId);

//   });
  
  router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;
  
    // Check if chef exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }
  
    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
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
