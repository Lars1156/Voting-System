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
};

const vaildPassword = async( voter, inputPassword)=>{
    try {
         const isMatch = await voter.comparePassword(inputPassword);
         return isMatch
    } catch (error) {
        throw new Error(``)
    }
}

const genrateToken = (voter) =>{
    return jwt.sign({voterId : voter._id, email : email._id}, secret ,{expiresIn:'1h'});
    
}
const updateVoteStatus = async (voterId) => {
    try {
        const voter = await Voter.findById(voterId);
        if (!voter) {
            throw new Error('Voter not found');
        }
        voter.vote = true; // Update the vote status
        await voter.save();
        return voter;
    } catch (error) {
        throw new Error(`Failed to update vote status: ${error.message}`);
    }
};

module.exports = {
    createVoter,
    findVoterEmail,
    vaildPassword,
    genrateToken,
    updateVoteStatus,
};