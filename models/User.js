import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,

    },
    gender: {
        type: String,
        enum:["male","female"],
        required: true,
    },
    role: {
        type: String,
        enum:["admin","user"],
       
    }
},{
    versionKey:false
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password, 10);
})

userSchema.methods.toJSON = function () {
    const obj = this.toObject();

    // Check if the object has an "image" property
    if (obj && obj.hasOwnProperty('image')) {
        obj.image = `${process.env.PUBLIC_URL}/users/${obj.image}`;
    } else {
        obj.image = `${process.env.PUBLIC_URL}/icons/images.png`;
    }

    // Check if the object has a "password" property before deleting it
    if (obj && obj.hasOwnProperty('password')) {
        delete obj.password;
    }

    return obj;
};

userSchema.methods.comparePassword=function(password){
    return bcrypt.compare(password,this.password)
}

userSchema.methods.generateToken=function(){
    let secret=process.env.JWT_SECRET;
    let expireDate=process.env.JWT_EXPRESS_IN
    return jwt.sign({id:this._id, role:this.role},secret,{
        expiresIn:expireDate,
    });
};


export default mongoose.model('UserData', userSchema);