import axiosInstance from '../config/axios.js'

const fetchMeteors = async (startDate, endDate) => {
  const response = await axiosInstance.get('/neo/rest/v1/feed', {
    params: {
      start_date: startDate,
      end_date: endDate
    }
  })

  return response.data.near_earth_objects
}

export default fetchMeteors
