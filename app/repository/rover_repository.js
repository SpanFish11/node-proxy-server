import axiosInstance from "../config/axios.js";

const fetchRoverPhotos = async (sol, apiKey) => {
    const response = await axiosInstance.get('/mars-photos/api/v1/rovers/curiosity/photos', {
        params: {
            sol: sol,
            api_key: apiKey,
        }
    });

    return response.data.photos;
}


export default fetchRoverPhotos;