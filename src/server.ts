import cookieParser from "cookie-parser"; import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
dotenv.config();

import initDB from "./database";
import Handler from "./exceptions";
import { ArticleRouter } from "./routes/article-routes";
import { AuthRouter } from "./routes/auth-routes";
import { TransactionRouter } from "./routes/transaction-routes";
import { filesRouter } from "./routes/files-routes";
import { UserRoutes } from "./routes/user-routes";
import { AnnouncementRoutes } from "./routes/announcement-routes";
import { AdminCommandRoutes } from "./routes/admincommand-routes";
import { LeaveRoutes } from "./routes/leave-routes";
const fileupload = require("express-fileupload");
// init app
const app = express();

//CORS
app.use(
    cors({
        origin: process.env.FRONT_END_URL,
        credentials: true,
    })
);
app.use(fileupload());
// global middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", AuthRouter);
app.use("/api/article", ArticleRouter);
app.use("/api/transaction", TransactionRouter);
app.use("/api/user", UserRoutes);
app.use("/api/files", filesRouter);
app.use("/api/admincommand", AdminCommandRoutes);
app.use("/api/announcement", AnnouncementRoutes);
app.use("/api/leave", LeaveRoutes);

let dir = __dirname.replace("/src", "");

if (process.env.NODE_ENV === "production") {
    dir = __dirname.replace("/dist", "");
    app.use(express.static(path.join(dir, "./client/dist/client")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(dir, "client", "dist", "client", "index.html"));
    });
}

// handle errors
app.use("*/", Handler.handleError);

const DB_URL = process.env.DB_URL || "";

initDB(DB_URL);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    // const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "", 6);
    // const userObj = new User({
    //     email: "user@example.com",
    //     password: hashedPassword,
    //     firstName: "ADMIN",
    //     type: UserType.ADMIN,
    //     username: "admin",
    //     name: "admin",
    //     employeeId: "1",
    //     mobileNo: "string",
    //     address: "aaa",
    //     contactPerson: {
    //         name: "string",
    //         mobileNo: "string",
    //         email: "string",
    //     },
    // });
    // const savedUser = await userObj.save();
    console.log(`Server connected at http://localhost:${PORT}`);
});
