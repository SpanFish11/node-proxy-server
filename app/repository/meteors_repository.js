import axios from "axios";
import config from '../config/config.js';

const fetchMeteors = async () => {
    const response = await axios.get(`${config.apiUrl}/feed`, {
        params: {
            start_date: config.startDate,
            end_date: config.endDate,
            api_key: config.apiKey,
        }
    });

    return response.data.near_earth_objects;
}


export default fetchMeteors;