import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";

const authAdmin = asyncHandler(async(req,_,next) =>{

    req.Admin = Admin
    next()

    
})

export { authAdmin }