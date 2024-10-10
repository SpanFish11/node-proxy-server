import fetchMeteors from '../repository/meteors_repository.js';

const getMeteors = async () => {
    const meteorsData = await fetchMeteors();

    return Object.values(meteorsData)
        .flat()
        .map(meteor => ({
            id: meteor.id,
            name: meteor.name,
            diameter: meteor.estimated_diameter.meters,
            is_potentially_hazardous_asteroid: meteor.is_potentially_hazardous_asteroid,
            close_approach_date_full: meteor.close_approach_data[0].close_approach_date_full,
            relative_velocity: parseFloat(meteor.close_approach_data[0].relative_velocity.kilometers_per_second)
        }));
}

export default getMeteors;