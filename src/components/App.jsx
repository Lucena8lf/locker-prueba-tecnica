import { City } from './City';
import { useCityDetails } from '../hooks/useCityDetails';
import '../styles/App.css';

function App() {
  const {
    cityDetails,
    getCityDetails,
    error,
    loading,
    searchHistory,
    isFirstInput,
  } = useCityDetails();

  const handleSubmit = (event) => {
    event.preventDefault();
    const fields = new window.FormData(event.target);
    const city = fields.get('city');

    // Pasamos la ciudad para que haga el fetch
    getCityDetails(city);
  };

  const handleHistoryClick = (city) => {
    getCityDetails(city);
  };

  return (
    <div className='page'>
      <header>
        <h1>WeatherCheck</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            type='text'
            name='city'
            placeholder='Córdoba, Granada, Madrid...'
          />
          <button>Buscar</button>
        </form>
        {error && <p className='error'>{error}</p>}
        {searchHistory.length > 0 && (
          <div>
            <span className='separator'></span>
            <div className='history'>
              <h3>Búsquedas recientes:</h3>
              <ul>
                {searchHistory.map((city, index) => (
                  <li
                    key={index}
                    className='historyItem'
                    onClick={() => handleHistoryClick(city)}
                  >
                    <p>{city}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      <main className='cityDetails'>
        {isFirstInput.current ? (
          <p>¡Bienvenido a WeahterCheck! Por favor, introduzca una ciudad</p>
        ) : loading ? (
          <p>Buscando...</p>
        ) : (
          <City cityDetails={cityDetails} />
        )}
      </main>
    </div>
  );
}

export default App;
