import User from "../models/User.js"


export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findOneAndUpdate({"_id":req.params.id},{$set: req.body});
        res.status(200).json(updatedUser)
    }catch(err){
        next(err);    
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const deleteUser = await User.deleteOne({ _id: req.params.id });
        res.status(200).json(deleteUser)
    }catch(err){
        next(err);   
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const allUsers = await User.findById(req.params.id).exec();
        res.status(200).json(allUsers)
    }catch(err){
        next(err);  
    }
}
 
export const getAllUser = async (req, res, next) => {
    try {
        const allUsers = await User.find().exec();
        res.status(200).json(allUsers)
    }catch(err){
        next(err);  
    }
}

