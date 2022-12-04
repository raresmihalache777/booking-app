import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {createError} from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req,res,next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        await newUser.save();
        res.status(201).send("User has been created")
    }catch(err){
        next(err);
    }
}

export const login = async (req,res,next) => {
    try{
        const user = await User.findOne({username:req.body.username});
        if(!user) return next(createError(404, "User not found"))

        //Compared hashed pass
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username"))

        //Create jwt token to be sent to user
        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET_KEY)
        const {password, isAdmin, ...otherProperties} = user._doc; 
    
        res.cookie("access_token",token,{
            //doesn't allow client side scripts to access the cookie
            httpOnly: true,
        }).status(200).json({...otherProperties});
    }catch(err){
        next(err);
    }
}