import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createSaves, deleteSaves, getSaves } from "../controller/saves.controller.js";



const router =express.Router();

router.post("/create",verifyToken,createSaves);
router.post("/delete",verifyToken,deleteSaves);
router.get("/",verifyToken,getSaves);


export default router