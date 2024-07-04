import { useEffect, useState } from "react";
import './App.css'; // Importa el archivo CSS

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}assets`;
        console.log("Fetching data from:", apiUrl);

        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("La respuesta no es JSON");
        }

        const result = await response.json();
        setData(result.data); // Actualizamos el estado con los datos obtenidos
      } catch (error) {
        console.error("La petición falló:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Lista de criptomonedas</h1>
      {error && <p className="error">Error: {error}</p>}
      {data ? (
        <div className="cards">
          {data.map((crypto) => (
            <div key={crypto.id} className="card">
              <h2>{crypto.name} ({crypto.symbol})</h2>
              <p>Rank: {crypto.rank}</p>
              <p>Supply: {parseFloat(crypto.supply).toLocaleString()}</p>
              <p>Max Supply: {parseFloat(crypto.maxSupply).toLocaleString()}</p>
              <p>Market Cap: ${parseFloat(crypto.marketCapUsd).toLocaleString()}</p>
              <p>Volume (24Hr): ${parseFloat(crypto.volumeUsd24Hr).toLocaleString()}</p>
              <p>Price: ${parseFloat(crypto.priceUsd).toFixed(2)}</p>
              <p>Change (24Hr): {parseFloat(crypto.changePercent24Hr).toFixed(2)}%</p>
              <p>VWAP (24Hr): ${parseFloat(crypto.vwap24Hr).toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default App;
