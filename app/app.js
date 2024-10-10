import express from "express";
import nunjucks from "nunjucks";
import config from "./config/config.js";
import meteorRouter from "./delivery/meteor_routes.js";
import errorHandler from "./middleware/error_handler.js";
import roverRouter from "./delivery/rover_routes.js";
import compression from "compression";

const app = express();
const port = config.port;

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.use(express.json());
app.use(compression());

app.use(meteorRouter);
app.use(roverRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})