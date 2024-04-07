import express from 'express';
import { login, register, registerAdmin, resetPassword, sendEmail } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/register",register)
router.post("/login", login)
router.post("/register-admin", registerAdmin)
//send reser link
router.post("/send-email", sendEmail)
//resetting the password
router.post("/reset-password", resetPassword)

export default router;