
import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { notFound, errorHandler } from './middlewares/errorHandler';
import {dbConnect} from './config/dbConnect'
import dotenv from 'dotenv'

import {authRouter} from "./routes/authRoute";
import {productRouter} from "./routes/productRoute";
import {categoryRouter} from "./routes/productCategoryRoute";
import {brandRouter} from "./routes/brandRoute";
import {couponRouter} from "./routes/couponRoute";



dotenv.config();
const app = express();
dbConnect();

const PORT = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/brand', brandRouter);
app.use('/api/coupon', couponRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`);
});