import express from "express";
import getMarsPhotos from "../useCases/fetch_rover_photos.js";
import Exception from "../utils/exception.js";
import {roverSchema} from "../middleware/validator/rover_schema.js";
import {validateBody} from "../middleware/validator/validator.js";


const roverRouter = express.Router();

roverRouter.get('/rover', (req, res, next) => {
    res.render('rover/index.html');
});

roverRouter.post('/rover/photos', validateBody(roverSchema), async (req, res, next) => {
    try {
        const {user_id, user_name, api_key} = req.body;

        const photos = await getMarsPhotos(api_key)

        res.render('rover/rover_photos.html', {user_id: user_id, user_name: user_name, photos: photos})
    } catch (error) {
        next(new Exception(error.code, `An error occurred while fetching data: ${error.message}`));
    }
})

export default roverRouter;