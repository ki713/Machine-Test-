const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

//user Schema for models

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },
    mobile_no : {
        type : Number,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique : true
    },
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ]
})

//Hashing Password to secure

userSchema.pre('save',async function(next){
    if(this.isModified('password')) {
        this.password = bcryptjs.hashSync(this.password,10);
    }
    next();
})

//Generate Tokens to Verify User

userSchema.methods.generateToken = async function() {
    try {
        let generatedToken = jwt.sign({_id: this._id},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token : generatedToken})
        await this.save();
        return generatedToken;
    }
    catch(error){
        console.log(error);
    }
}

//Create Model

const cs1 = new mongoose.model("USER",userSchema);

module.exports = cs1;