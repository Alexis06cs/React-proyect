import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${API_URL }assets`;
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
    <>
      <h1>Lista de criptomonedas</h1>
      {error && <p>Error: {error}</p>}
      {data ? (
        <ul>
          {data.map((crypto) => (
            <li key={crypto.id}>Nombre es: <b>{crypto.name}</b></li>
          ))}
        </ul>
      ) : (
        <p>Cargando datos...</p>
      )}
    </>
  );
}

export default App;
