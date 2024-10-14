const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Voter = require('../Backend/model/voter');
const  secret = "kishan@1156"

router.post('/registerUser', async(req, res)=>{
    const {userName , email , passwprd} = req.body;
    try {
        const user = await Voter.findOne({email});
        if(user){
            return res.status(400).json('message: User is Allready Exist') 
        }
        const newVoter = new Voter({userName , email , passwprd});
        await newVoter.save();
        const token = jwt.sign({voterId: newVoter._id}, secret, {expiresIn:'2h'});
        return res.status(201).json('message: User is Register Successfully' , token);
    } catch (error) {
        return res.status(500).json('message: Internal Server Error ');
    }
});

// Login Routes
router.post('loginUser' , async(req,res)=>{
    const{email , passwprd} = req.body;
    try {
        const voter = await  Voter.findOne({email});
        if(!voter){
            res.status(400).json('Message: User Not Found')
        }
        const isMatched = await Voter.compare({passwprd});
        if(!isMatched){
            res.status(400).json('message: Password is Missmatched ')
        }
    } catch (error) {
        
    }
})