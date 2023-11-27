const API_KEY = '302b101b552219aa0394aba106f78930';

export async function searchCity({ city }) {
  if (city === '') return null;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      return null;
    }
    const cityDetails = await response.json();
    console.log(cityDetails);

    // Evitamos seguir el contrato de la API
    const mappedDetails = {
      temperatureCelsius: cityDetails.main.temp,
      windSpeed: cityDetails.wind.speed,
      humidityPercentage: cityDetails.main.humidity,
      ...cityDetails,
    };

    return mappedDetails;
  } catch (error) {
    throw new Error('Error al buscar ciudades');
  }
}
