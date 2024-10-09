import axios from "axios";

const apiKey = '';
const startDate = '2024-09-01';
const endDate = '2024-09-07';

await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`)
    .then(response => console.log(response.data))
    .catch(error => console.log(error.message));