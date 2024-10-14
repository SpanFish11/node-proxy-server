import fetchMeteors from '../repository/meteors_repository.js'
import config from '../config/config.js'

const getMeteors = async (date, hasCount, isDangerous) => {
  const { startDate, endDate } = getStartAndEndDates(date)

  const meteorsData = await fetchMeteors(startDate, endDate)

  const data = Object.values(meteorsData)
    .flat()
    .map((meteor) => ({
      id: meteor.id,
      name: meteor.name,
      diameter: meteor.estimated_diameter.meters,
      is_potentially_hazardous_asteroid:
        meteor.is_potentially_hazardous_asteroid,
      close_approach_date_full:
        meteor.close_approach_data[0].close_approach_date_full,
      relative_velocity: parseFloat(
        meteor.close_approach_data[0].relative_velocity.kilometers_per_second
      )
    }))

  const responseData = { meteor_data: data }

  if (isDangerous) {
    responseData.were_dangerous_meteors = data.filter(
      (meteor) => meteor.is_potentially_hazardous_asteroid
    )
  }

  if (hasCount) {
    responseData.element_count = data.length
  }

  return responseData
}

const getStartAndEndDates = (date) => {
  if (date) {
    return { startDate: date, endDate: date }
  }

  return { startDate: config.startDate, endDate: config.endDate }
}

export default getMeteors
