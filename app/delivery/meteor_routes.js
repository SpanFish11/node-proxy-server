import express from 'express';
import getMeteors from "../useCases/fetch_meteors.js";
import Exception from "../utils/exception.js";
import {stringToBoolean} from "../utils/helpers.js";

const meteorRouter = express.Router();

meteorRouter.get('/meteors', async (req, res, next) => {
    try {
        const {date, count, wereDangerousMeteors} = req.query;

        const meteors = await getMeteors(date, stringToBoolean(count), stringToBoolean(wereDangerousMeteors));

        res.render('meteor_data.html', meteors);
    } catch (error) {
        next(new Exception(error.code, `An error occurred while fetching data: ${error.message}`));
    }
});

export default meteorRouter;