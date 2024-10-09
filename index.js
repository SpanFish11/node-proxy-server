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

        const {near_earth_objects} = response.data;

        res.json(near_earth_objects);
    } catch (error) {
        console.error('Error fetching meteor data:', error);

        res.status(500).json({error: 'An error occurred while fetching data.'});
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})