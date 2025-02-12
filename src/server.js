import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import databaseConnection from "./config/database.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("welcome to edgistify");
});

//routes
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

databaseConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`server running on ${port}`);
        });
    })
    .catch((error) => {
        console.error("db connection failed:", error);
    });
