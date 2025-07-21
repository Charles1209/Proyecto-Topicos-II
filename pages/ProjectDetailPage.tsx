// =================================================================
// ARCHIVO 2: pages/ProjectDetailPage.tsx (ACTUALIZADO)
// DESCRIPCIÓN: Se añade el botón "Donar a este Proyecto".
// =================================================================
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// --- Tipos de Datos (ACTUALIZADO) ---
interface ZonaAfectada {
  nombre: string;
  lat: number;
  lng: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageUrl_detalle: string;
  descripcion_detallada: string;
  centroMapa: { lat: number; lng: number; };
  zonas_afectadas: ZonaAfectada[];
}


const ProjectDetailPage: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { projectId } = useParams<{ projectId: string }>();
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyASJUzGbaBxJ2g3k98FVuau8RVbX_duwBU" // Usa la misma clave que ya tienes
  });

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/proyectos/${projectId}`);
        if (!response.ok) {
          throw new Error('No se pudo encontrar el proyecto.');
        }
        const data = await response.json();
        
        setProject({
          id: data.id,
          title: data.nombre,
          description: data.descripcion,
          imageUrl: data.imagenUrl,
          imageUrl_detalle: data.imagenUrl_detalle, 
          descripcion_detallada: data.descripción_detallada || data.descripcion_detallada,
          centroMapa: data.centroMapa,
          zonas_afectadas: data.zonas_afectadas
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading || !isLoaded) return <div className="text-center py-24">Cargando proyecto...</div>;
  if (error) return <div className="text-center py-24 text-red-600">Error: {error}</div>;
  if (!project) return <div className="text-center py-24">Proyecto no encontrado.</div>;

  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/proyectos" className="text-sky-600 font-semibold hover:text-sky-700 mb-8 inline-block">
          ← Volver a todos los proyectos
        </Link>
        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-4">{project.title}</h1>
        
        <img 
          src={project.imageUrl_detalle || project.imageUrl}
          alt={project.title} 
          className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
          onError={(e) => { (e.target as HTMLImageElement).src = '[https://placehold.co/800x600/cccccc/333333?text=Imagen+no+disponible](https://placehold.co/800x600/cccccc/333333?text=Imagen+no+disponible)'; }}
        />
        
        <p className="text-lg text-slate-700 mb-12 whitespace-pre-line">
          {project.descripcion_detallada}
        </p>
        
        {/* --- ¡ESTE ES EL CAMBIO! --- */}
        <div className="text-center my-12">
          <Link 
            to={`/donar/${project.id}`}
            className="bg-orange-500 text-white font-bold text-xl px-12 py-4 rounded-lg shadow-lg hover:bg-orange-600 transition-colors duration-300"
          >
            Donar a este Proyecto
          </Link>
        </div>
        {/* ----------------------------- */}

        {project.centroMapa && project.zonas_afectadas && (
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Ubicación del Proyecto</h2>
            <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={project.centroMapa}
                zoom={8}
              >
                {Array.isArray(project.zonas_afectadas) && project.zonas_afectadas.map((zona, index) => (
                  <Marker key={index} position={{ lat: zona.lat, lng: zona.lng }} title={zona.nombre} />
                ))}
              </GoogleMap>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;