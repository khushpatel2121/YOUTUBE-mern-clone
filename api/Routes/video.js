import express from "express";
import { addView, createVideo, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/Video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/",verifyToken,createVideo);

router.put("/:id",verifyToken,updateVideo);

router.delete("/:id",verifyToken,deleteVideo);

router.get("/find/:id",getVideo);

router.get("/view/:id",addView);

router.get("/random",random);

router.get("/trend",trend);

router.get("/sub",verifyToken,sub);

router.get("/tags", getByTag);

router.get("/search", search);





export default router
