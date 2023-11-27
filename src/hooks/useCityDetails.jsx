import { useRef, useState } from 'react';
import { searchCity } from '../services/searchCity';

export function useCityDetails() {
  const [cityDetails, setCityDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(window.localStorage.getItem('history')) ?? []
  );
  const previousSearch = useRef('');
  const isFirstInput = useRef(true);

  const getCityDetails = async (city) => {
    // Controlamos primer input
    isFirstInput.current = city === '';
    if (city === '') {
      setError('No se ha ingresado ninguna ciudad');
      return;
    }

    // Evitamos que se haga dos veces la misma búsqueda
    if (city === previousSearch.current) return;

    try {
      setLoading(true);
      previousSearch.current = city;
      const newCityDetails = await searchCity({ city });
      // Actualizamos el historial
      if (newCityDetails && !searchHistory.includes(city)) {
        setSearchHistory((prevHistory) => {
          const updatedHistory = [...prevHistory, city].slice(-5);
          // Persisitimos en el localStorage
          window.localStorage.setItem(
            'history',
            JSON.stringify(updatedHistory)
          );
          return updatedHistory;
        });
      }
      setCityDetails(newCityDetails);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    cityDetails,
    getCityDetails,
    error,
    loading,
    searchHistory,
    isFirstInput,
  };
}
