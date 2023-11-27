import { TemperatureIcon, WindIcon, HumidityIcon } from './Icons';
import '../styles/City.css';

function CityDetails({ cityDetails }) {
  return (
    <ul className='listDetails'>
      <li className='detail'>
        <TemperatureIcon />
        <strong>Temperatura: </strong>
        <span className='data'>{cityDetails.temperatureCelsius} °C</span>
      </li>
      <li className='detail'>
        <HumidityIcon />
        <strong>Humedad:</strong>{' '}
        <span className='data'>{cityDetails.humidityPercentage}%</span>
      </li>
      <li className='detail'>
        <WindIcon />
        <strong>Viento</strong>:{' '}
        <span className='data'>{cityDetails.windSpeed} m/s</span>
      </li>
    </ul>
  );
}

function NoCityDetails() {
  return <p>La ciudad buscada no ha sido encontrada</p>;
}

export function City({ cityDetails }) {
  const hasWeather = cityDetails && cityDetails.cod == 200;

  return hasWeather ? (
    <CityDetails cityDetails={cityDetails} />
  ) : (
    <NoCityDetails />
  );
}
