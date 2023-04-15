import express from "express";
import { addcomment,deletecomment,getcomments } from "../controllers/Comment.js";

import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/",verifyToken, addcomment);

router.delete("/:id", verifyToken, deletecomment);

router.get("/:videoId", verifyToken, getcomments);

export default router