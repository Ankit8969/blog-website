const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    organization:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
    },
    token:{
        type:String,
        trim:true,
    }
});

userSchema.virtual('connection', {
    ref:'Store',
    localField:'_id',
    foreignField:'userTasks'
})


userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})


userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id}, "secretkey");
    user.token = token;
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email:email});
    if(!user){
        throw new Error('Unable to Login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Unable to Login');
    }
    return user;
}


const User = mongoose.model('User', userSchema);
module.exports = User;