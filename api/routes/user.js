import express from 'express';
import { getAllUsers, getUserById } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';


const router = express.Router();

//Get All 
//router.get('/', verifyAdmin, getAllUsers)
router.get('/', verifyAdmin, getAllUsers)

//get by ID
//router.get('/:id', verifyUSer, getUserById)
router.get('/:id', verifyUser, getUserById)

export default router;