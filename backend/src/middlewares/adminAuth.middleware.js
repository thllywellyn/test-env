import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { admin } from "../models/admin.model.js";
import mongoose from "mongoose";
import db from "../database/db.js";

const authAdmin = asyncHandler(async(req, _, next) => {
    // Ensure database connection
    await db();
    
    const adminId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(adminId)) {
        throw new ApiError(400, "Invalid admin ID format");
    }
    
    const Admin = await admin.findById(adminId).select("-password -Refreshtoken");

    if(!Admin) {
        throw new ApiError(401, "Unauthorized - Admin not found");
    }

    req.Admin = Admin;
    next();
});

export { authAdmin }