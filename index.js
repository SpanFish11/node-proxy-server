import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;
const startDate = process.env.START_DATE;
const endDate = process.env.END_DATE;

await axios.get(`${apiUrl}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`)
    .then(response => console.log(response.data))
    .catch(error => console.log(error.message));