import fetchRoverPhotos from "../repository/rover_repository.js";

const getMarsPhotos = async (apiKey) => {
    return await fetchRoverPhotos(1000, apiKey)
}

export default getMarsPhotos;