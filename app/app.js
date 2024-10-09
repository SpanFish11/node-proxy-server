import express from "express";
import config from "./config/config.js";
import meteorRouter from "./delivery/meteor_routes.js";
import errorHandler from "./middleware/error_handler.js";

const app = express();
const port = config.port;

app.use(express.json());

app.use(meteorRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})