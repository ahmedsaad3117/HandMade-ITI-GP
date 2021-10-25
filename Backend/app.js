const morgan = require("morgan");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const ordersRouter = require("./routers/orders");
const productRouter = require("./routers/ProductRouter");
const userRouter = require("./routers/userRouter");
const categoryRouter = require("./routers/categoryRouter");
const globalErrorHandler = require('./controllers/errorController.js');

const app = express();
require("dotenv/config");
const api = process.env.API_URL;

app.use(cors());
app.options("*", cors());

//middlewares

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "public")));

mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connection is ready..");
    })
    .catch((err) => {
        console.log(err);
    });

// routes
app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, userRouter);
app.use(globalErrorHandler)
app.listen(3000, () => {
    console.log("Server is running http://localhost:3000");
});
