// =================================================================
// ARCHIVO: pages/CountriesPage.tsx (ACTUALIZADO)
// DESCRIPCIÓN: Esta página ahora busca los datos de los países desde tu API.
// =================================================================
import React, { useState, useEffect } from 'react';

// Definimos un tipo para los datos de los países, para que TypeScript sepa qué esperar.
interface Pais {
  id: string;
  nombre: string;
  capital: string;
  coordenadas: [number, number];
  estadistica_clave: string;
}

function CountriesPage() {
  // Estado para guardar la lista de países que viene de la API.
  const [paises, setPaises] = useState<Pais[]>([]);
  // Estado para manejar si los datos se están cargando.
  const [cargando, setCargando] = useState(true);
  // Estado para guardar cualquier error que pueda ocurrir.
  const [error, setError] = useState<string | null>(null);

  // useEffect se ejecuta una vez que el componente se monta en la pantalla.
  useEffect(() => {
    // Función para buscar los datos.
    const fetchPaises = async () => {
      try {
        // Hacemos la petición a nuestro backend.
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/paises`);
        
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }

        const data: Pais[] = await response.json();
        setPaises(data); // Guardamos los datos en el estado.
      } catch (err: any) {
        setError(err.message); // Guardamos el mensaje de error.
      } finally {
        setCargando(false); // Dejamos de cargar, ya sea con éxito o con error.
      }
    };

    fetchPaises(); // Llamamos a la función para que se ejecute.
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez.

  // Mostramos un mensaje mientras los datos se cargan.
  if (cargando) {
    return <div>Cargando países...</div>;
  }

  // Mostramos un mensaje si hubo un error.
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Si todo salió bien, mostramos la lista de países.
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Nuestros Países de Operación</h1>
      {paises.length > 0 ? (
        <ul>
          {paises.map((pais) => (
            <li key={pais.id} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
              <h2>{pais.nombre}</h2>
              <p><strong>Capital:</strong> {pais.capital}</p>
              <p><strong>Dato Clave:</strong> {pais.estadistica_clave}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron países en la base de datos.</p>
      )}
    </div>
  );
}

export default CountriesPage;