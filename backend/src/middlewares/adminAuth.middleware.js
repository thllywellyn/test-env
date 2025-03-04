import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { admin } from "../models/admin.model.js";

const authAdmin = asyncHandler(async(req, _, next) => {
    const username = req.body.username;
    
    const Admin = await admin.findOne({ username }).select("-password -Refreshtoken");

    if(!Admin) {
        throw new ApiError(401, "Unauthorized - Admin not found");
    }

    req.Admin = Admin;
    next();
});

export { authAdmin }