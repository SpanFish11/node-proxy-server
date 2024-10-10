import express from "express";
import getMarsPhotos from "../useCases/fetch_rover_photos.js";
import Exception from "../utils/exception.js";


const roverRouter = express.Router();

roverRouter.post('/rover', async (req, res, next) => {
    try {
        const {user_id, user_name} = req.body;
        const user_api_key = req.headers['api-key'];

        const photos = await getMarsPhotos(user_api_key)

        res.send({user_id: user_id, user_name: user_name, photos: photos})
    } catch (error) {
        next(new Exception(error.code, `An error occurred while fetching data: ${error.message}`));
    }
})

export default roverRouter;