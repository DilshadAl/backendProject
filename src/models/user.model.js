import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
        userName:{
            type:String,
            required:true,
            index:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        fullName:{
            type:String,
            required:true,
            index:true,
        },
        avatar:{
            type:String,
            required:true
        },
        coverImage:{
            type:String,
            required:true
        },
        watchHistory:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        },
        password:{
            type:String,
            required:[true, "Please Enter a valid password"],
            min:[8, "Password must contain at least 8 char"],
            max:15
        },
        refeshToken:{
            type:String,
            required:true
        }
}
,{timestamps:true})


userSchema.pre("save", function(next){
    if(!this.isModified("password")) return next();

    this.password= bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.isPasswordCorrect= async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken= async function(){
    return await jwt.sign({
        _id:this._id,
        userName:this.userName,
        email:this.email,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshToken =async function(){
    return await jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model("User", userSchema)