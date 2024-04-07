import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import UserToken from "../models/UserToken.js";

export const register = async (req, res, next) => {
  const role = await Role.find({ role: 'User' });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt)
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    roles: role
  });
  await newUser.save();
  return res.status(200).json("User registered successfully")
  // return next(createSuccess(200, "Registration Success"))
}

export const registerAdmin = async (req, res, next) => {
  const role = await Role.find({});
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt)
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    isAdmin: true,
    roles: role
  });
  await newUser.save();
  return next(createSuccess(200, "Admin Registered successfully!"))
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    .populate("roles", "role");
    const { roles } = user;
    if (!user) {
      return res.status(404).send("user not found")
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).send("Password is incorrect")
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, role: roles },
      process.env.JWT_SECRET
    )
    res.cookie("access", token, { httpOnly: true })
      .status(200)
      .json({
        status: 200,
        message: "login Success",
        data: user
      })

    // return next(createSuccess(200,"Login Success!"))
      
  } catch (error) {
    return res.status(500).send("Internal Server Error")
  }
}

export const sendEmail = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email: { $regex: '^' + email + '$', $options: 'i' } })
  if (!user) {
    return next(createError(404, "user not found to reset the email"))
  }
  const payload = {
    email: user.email
  }
  console.log("user", user);
  const expiryTime = 300
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiryTime })

  const newToken = new UserToken({
    userId: user._id,
    token: token
  });

  const mailTranspoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bhupeshther5@gmail.com",
      pass: "advy gyix hwtk ftao"
    }
  });

  let mailDetails = {
    from: "bhupeshther5@gmail.com",
    to: email,
    subject: "Reset Password",
    html: `
        <html>
    <head>
        <title>Password reset request</title>
    </head>
    <body>
        <h1>Password Reset</h1>
        <p>Dear ${user.username}</p>
        <p>We have received a request to reset your password</p>
        <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color: green; color: white; padding: 14px 20px; border: none;">Reset Password</button></a>
        <p>Please note that this link is valid for 5 mins, If you didn't request a password reset, Please discard this message</p>
        <p>Thank you,</p>
        <p>FreshFule</p>
    </body>
</html>`
  };
  mailTranspoter.sendMail(mailDetails, async (err, data) => {
    if (err) {
      console.log(err);
      return next(createError(500, "Something wend wrong"))
    }
    else {
      await newToken.save();
      return next(createSuccess(200, 'Email sent successfully!'))
    }
  })
}

export const resetPassword = (req, res, next) => {
  const token = req.body.token
  const newPassword = req.body.password

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return next(createError(500, "Link Expired!!"))
    }
    else {
      const response = data;
      const user = await User.findOne({ email: { $regex: '^' + response.email + '$', $options: 'i' } });
      const salt = await bcrypt.genSalt(10);
      const encryptPassword = await bcrypt.hash(newPassword, salt);
      user.password = encryptPassword;
      try {
        const updateduser = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: user },
          { new: true }
        )
        return next(createSuccess(200, "Password Reset success"))
      } catch (error) {
        return next(createError(500, "Something went wrong!"))
      }
    }
  })
}




