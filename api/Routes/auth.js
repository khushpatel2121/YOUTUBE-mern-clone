import express from "express";
import {signup,signin, authGoogle} from "../controllers/auth.js"

const router = express.Router();

router.post("/signup",signup);

router.post("/signin",signin );

router.post("/google",authGoogle )

export default router