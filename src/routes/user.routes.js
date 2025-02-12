import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const userRouter = Router();
const key = process.env.JWT_SECRET;

// sign up
userRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const result = await UserModel.findOne({ email });
    if (result) {
        res.status(400).send({ message: "Email already exists" });
    } else {
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.status(500).send({ message: "Something went wrong, please try again" });
            }
            const new_user = new UserModel({
                name: name,
                email: email,
                password: hash,
            });
            await new_user.save();
            res.status(200).send({ message: "Signup successful" });
        });
    }
});

// login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    const userId = user._id;
    const userName = user.name;
    const hash = user.password;

    bcrypt.compare(password, hash, async function (err, result) {
        if (err) {
            return res.status(500).send({ message: "Something went wrong, please try again" });
        }
        if (result) {
            const token = jwt.sign({ userId, userName }, key);
            res.status(200).send({ message: "Login successful", token, userName, userId });
        } else {
            res.status(401).send({ message: "Login failed" });
        }
    });
});

export default userRouter;