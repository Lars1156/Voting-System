const Voter = require('../model/voter');
const jwt = require('jsonwebtoken');

const secret = "Kishan@1156";

const createVoter   = async(voterData) =>{
    try {
        const  newVoter = new Voter(voterData);
        await newVoter.save();
        return newVoter;
    } catch (error) {
        throw new Error(`failed to Create the Voter ${error.message}`);
    }
};
// Finding the Voter Using the Email 

const findVoterEmail = async(email)=>{
    try {
        const voter = await Voter.findOne({email});
        return voter
    } catch (error) {
        throw new Error(`Failed to Find Voter Or Voter Does not Exist ${error.message}`);
    }
}