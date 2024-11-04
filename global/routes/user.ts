import express from "express";
import { createUser,getAllUser,searchUser } from "../controller/user";
const router =express.Router();

router.post("/register",createUser)
.post("/search",searchUser)
.get("/",getAllUser)


export default router;