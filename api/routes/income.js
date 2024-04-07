import express from 'express';
import Role from '../models/Role.js';
import { createRole, deleteRole, getAllRoles, updateRole } from '../controllers/role.controller.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//Create a new role in DB
router.post('/create',verifyAdmin ,createRole);

//Update a role in DB
router.put('/update/:id', verifyAdmin ,updateRole);

//Get All Role
router.get('/getAll', getAllRoles)

//Delete a role
router.delete('/deleteRole/:id',deleteRole)

export default router;