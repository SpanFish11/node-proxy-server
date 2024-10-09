import express from 'express';
import getMeteors from "../useCases/fetch_meteors.js";
import Exception from "../utils/exception.js";

const meteorRouter = express.Router();

meteorRouter.get('/meteors', async (req, res, next) => {
    try {
        const meteors = await getMeteors();

        res.json(meteors);
    } catch (error) {
        next(new Exception(error.code, `An error occurred while fetching data: ${error.message}`));
    }
});

export default meteorRouter;