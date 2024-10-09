import axios from "axios";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const apiUrl = process.env.NASSA_API_URL;
const apiKey = process.env.API_KEY;
const startDate = process.env.START_DATE;
const endDate = process.env.END_DATE;

app.get('/meteors', async (req, res) => {
    try {
        const response = await axios.get(`${apiUrl}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`);

        const meteors = Object.values(response.data.near_earth_objects)
            .flat()
            .map(meteor => ({
                id: meteor.id,
                name: meteor.name,
                diameter: meteor.estimated_diameter.meters,
                is_potentially_hazardous_asteroid: meteor.is_potentially_hazardous_asteroid,
                close_approach_date_full: meteor.close_approach_data[0].close_approach_date_full,
                relative_velocity: parseFloat(meteor.close_approach_data[0].relative_velocity.kilometers_per_second)
            }));

        res.json(meteors);
    } catch (error) {
        console.error('Error fetching meteor data:', error);

        res.status(500).json({error: 'An error occurred while fetching data.'});
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})