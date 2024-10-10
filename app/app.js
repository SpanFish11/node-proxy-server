import express from "express";
import config from "./config/config.js";
import meteorRouter from "./delivery/meteor_routes.js";
import errorHandler from "./middleware/error_handler.js";
import nunjucks from "nunjucks";

const app = express();
const port = config.port;

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.use(express.json());

app.use(meteorRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})