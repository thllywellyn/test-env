import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Razorpay from "razorpay"

const app = express();

const corsOptions = {
    origin: ["*","https://test-env-kappa.vercel.app", "https://*.lsanalab.xyz"], // specify allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"], // specify allowed methods
    credentials: true // allow cookies to be sent
};

app.use(cors(corsOptions))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


export const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})

//student routes
import studentRouter from "./routes/student.routes.js";
app.use("/api/student", studentRouter)


//teacher routes
import teacherRouter from "./routes/teacher.routes.js"
app.use("/api/teacher", teacherRouter)

//course routes
import courseRouter from "./routes/course.routes.js"
app.use("/api/course", courseRouter)

import adminRouter from "./routes/admin.routes.js"
app.use("/api/admin", adminRouter)

import paymentRouter from "./routes/payment.routes.js"
app.use("/api/payment", paymentRouter)


export {app}