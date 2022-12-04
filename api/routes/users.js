import express from 'express';
import {updateUser,deleteUser,getUserById,getAllUser} from '../controllers/user.js'; 
import {verifyToken,verifyUser,verifyAdmin} from '../utils/verifyToken.js'

const router = express.Router();

// //check if the jwt is valid (unaltered)
// router.get("/checkauthentication",verifyToken, (req,res,next) => {
//     res.send("hello user, your token is valid");
// })

// //check if the jwt belongs to the current user or the current user is admin
// router.get("/checkuser/:id",verifyUser, (req,res,next) => {
//     res.send("hello user, you are logged in and you can delete your account");
// })

// //check the current user is admin
// router.get("/checkadmin/:id",verifyAdmin, (req,res,next) => {
//     res.send("hello admin, you are logged in and you can delete all accounts");
// })


//UPDATE 
router.put("/:id",verifyUser,updateUser);

//DELETE
router.delete("/:id",verifyUser,deleteUser);

//GET
router.get("/:id",verifyUser,getUserById);

//GET ALL
router.get("/",verifyAdmin,getAllUser);



export default router;