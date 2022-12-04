import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import {createError} from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try{
        const savedRoom = await newRoom.save();

        try{
            await Hotel.findByIdAndUpdate(hotelId, {
                //$push allows to push into any array
                $push : {rooms: savedRoom._id}
            });
        }catch(err){
            next(err);
        }
        res.status(200).json(savedRoom);
    }catch(err){
        next(err);
    }
};

export const updateRoom = async (req, res, next) => {
    try {
        //new:true makes the function return the new document instead the old one
        const updatedRoom = await Room.findOneAndUpdate({_id:req.params.id},{$set: req.body},{new: true});
        res.status(200).json(updatedRoom)
    }catch(err){
        next(err);    
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            {
                "roomNumbers._id": req.params.id
            },
            {
                $push:{
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated")
    }catch(err){
        next(err);    
    }
}

export const getRoomAvailability = async (req, res, next) => {
    try {
        const room = await Room.find(
            {
                "roomNumbers._id": req.params.id
            }
        );
        res.status(200).json(room)
    }catch(err){
        next(err);    
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;

    try {
        const deletedRoom = await Room.deleteOne({ _id: req.params.id });
        try{
            await Hotel.findByIdAndUpdate(hotelId, {
                //$push allows to push into any array
                $pull : {rooms: req.params.id}
            });
        }catch(err){
            next(err);
        }
        res.status(200).json(deletedRoom)
    }catch(err){
        next(err);   
    }
}

export const getAllRoom = async (req, res, next) => {
    try {
        const allRooms = await Room.find().exec();
        res.status(200).json(allRooms)
    }catch(err){
        next(err);  
    }
    
}

export const getRoomById = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id).exec();
        res.status(200).json(room)
    }catch(err){
        next(err);  
    }
}