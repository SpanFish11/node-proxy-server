import axios from "axios";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

const port = process.env.PORT;
const apiUrl = process.env.NASSA_API_URL;
const apiKey = process.env.API_KEY;
const startDate = process.env.START_DATE;
const endDate = process.env.END_DATE;

const getNeoFeed = async () => {
    await axios.get(`${apiUrl}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`)
        .then(response => console.log(response.data))
        .catch(error => console.log(error.message));
};

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(getNeoFeed());
})