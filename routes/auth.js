import express from "express";
import {login} from '../controllar/auth.js';
const router = express.Router();


// All Authentication routes
router.post("/api/login", login);

export default router;