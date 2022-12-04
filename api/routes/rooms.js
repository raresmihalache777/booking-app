import express from 'express';
import {createRoom,updateRoom,deleteRoom,getAllRoom,getRoomById, updateRoomAvailability, getRoomAvailability} from '../controllers/room.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';


const router = express.Router();

//CREATE 
router.post("/:hotelid",verifyAdmin, createRoom);

//UPDATE 
router.put("/:id",verifyAdmin, updateRoom);

//UPDATE 
router.put("/availability/:id",verifyUser,updateRoomAvailability);

//GET  AVAILABILITY 
router.get("/availability/:id",verifyUser,getRoomAvailability);

//DELETE
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom)

//GET
router.get("/:id",getRoomById)

//GET ALL
router.get("/",getAllRoom)

export default router;