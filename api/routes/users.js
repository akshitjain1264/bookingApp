import express from "express";
import User from "../models/User.js";
import {
    deleteUser,
    getUser,
    getUsers,
    updateUser,
  } from "../controllers/users.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";
  
  const router = express.Router();
  
  router.get("/checkauthentication", verifyToken, (req,res,next)=>{
    res.send("Hello user, you are logged in");
  })

  router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
    res.send("hello user, you are logged in and you can delete your account");
  })

  //UPDATE
  router.put("/:id", updateUser);
  
  //DELETE
  router.delete("/:id", deleteUser);
  //GET
  router.get("/:id", getUser);
  
  //GET ALL
  router.get("/", getUsers);

export default router;