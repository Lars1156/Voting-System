const voterService = require('../services/voterService');

// Register the Voter and User for the portel
const registerVoter = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const voter = await voterService.createVoter({ userName, email, password });
        res.status(201).json({ message: 'Voter registered successfully', voter });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login the User with genarating the jsonwebtoken
const loginVoter = async (req, res) => {
    try {
        const { email, password } = req.body;
        const voter = await voterService.findVoterByEmail(email);
        if (!voter) {
            return res.status(404).json({ message: 'Voter not found' });
        }

        const isPasswordValid = await voterService.validatePassword(voter, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token after successful login
        const token = voterService.generateToken(voter);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Apply the vote on the portal 
const vote = async (req, res) => {
    try {
        const { voterId } = req.voter; 
        const updatedVoter = await voterService.updateVoteStatus(voterId);
        res.status(200).json({ message: 'Vote registered', updatedVoter });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerVoter,
    loginVoter,
    vote,
};
