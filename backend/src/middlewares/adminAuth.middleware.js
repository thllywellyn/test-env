import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { admin } from "../models/admin.model.js";
import mongoose from "mongoose";
import db from "../database/db.js";

const authAdmin = asyncHandler(async(req, _, next) => {
    try {
        await db();
        
        const adminId = req.params.id;

        if (!adminId || !mongoose.isValidObjectId(adminId)) {
            throw new ApiError(400, "Please provide a valid admin ID");
        }
        
        const Admin = await admin.findById(adminId).select("-password -Refreshtoken");

        if(!Admin) {
            throw new ApiError(401, "Unauthorized - Admin not found");
        }

        req.Admin = Admin;
        next();
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "Internal server error while authenticating admin");
    }
});

export { authAdmin }