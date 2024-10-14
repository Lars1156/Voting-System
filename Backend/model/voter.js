const mongoose = require('mangodb');
const bycrypt = require('bcryptjs')

const voterSchema = new mongoose.Schema({
    userName:{type:String, required:true},
    email:{type:String , required:true},
    password:{type:String, required:true},
    vote:{type:Boolean , default:false}
});

voterSchema.pre('save' , async function(next){
  try {
     if(this.isModifyed('password')){
        const salt = await bycrypt.genSalt(10);
        this.password = bycrypt.hash(this.password, salt)
     }
     next()
  } catch (error) {
    next(error);
  }
});

voterSchema.method.comparePassword = function(inputPassword){
    return bycrypt.compare(inputPassword , this.password)
}

module.exports = mongoose.module('Voter', voterSchema);