import express from 'express'
import getMarsPhotos from '../useCases/fetch_rover_photos.js'
import Exception from '../utils/exception.js'
import { roverSchema } from '../middleware/validator/rover_schema.js'
import { validateBody } from '../middleware/validator/validator.js'

const roverRouter = express.Router()

roverRouter.get('/rover', (req, res) => {
  res.render('rover/index.html')
})

roverRouter.post(
  '/rover/photos',
  validateBody(roverSchema),
  async (req, res, next) => {
    try {
      const { user_id: userId, user_name: userName, api_key: apiKey } = req.body

      const photos = await getMarsPhotos(apiKey)

      res.render('rover/rover_photos.html', {
        userId,
        userName,
        photos
      })
    } catch (error) {
      next(
        new Exception(
          error.code,
          `An error occurred while fetching data: ${error.message}`
        )
      )
    }
  }
)

export default roverRouter
