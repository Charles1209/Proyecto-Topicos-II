// =================================================================
// ARCHIVO: pages/ProjectsPage.tsx (VERSIÓN FINAL CON MODAL)
// =================================================================
import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import ProjectCard from '../components/ProjectCard';

// --- Tipos de Datos ---
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
  centroMapa: {
    lat: number;
    lng: number;
  };
  zonas_afectadas: ZonaAfectada[];
}

// --- ¡NUEVO! Componente del Modal ---
const MapModal = ({ project, onClose }: { project: Project | null, onClose: () => void }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl relative">
        <button 
          onClick={onClose} 
          className="absolute -top-4 -right-4 bg-white rounded-full p-2 text-slate-800 shadow-lg hover:bg-slate-200 z-10"
          aria-label="Cerrar mapa"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ubicación de: {project.title}</h2>
          <div className="w-full h-[60vh] rounded-md overflow-hidden">
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
      </div>
    </div>
  );
};

// --- Página Principal de Proyectos ---
const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectForMap, setSelectedProjectForMap] = useState<Project | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyASJUzGbaBxJ2g3k98FVuau8RVbX_duwBU" // Reemplaza con tu clave
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/proyectos`);
        if (!response.ok) throw new Error('La respuesta de la red no fue correcta');
        const data = await response.json();
        const formattedProjects = data.map((p: any) => ({
          id: p.id,
          title: p.nombre,
          description: p.descripcion,
          imageUrl: p.imagenUrl,
          centroMapa: p.centroMapa,
          zonas_afectadas: p.zonas_afectadas || []
        }));
        setProjects(formattedProjects);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const openMapModal = (project: Project) => {
    setSelectedProjectForMap(project);
  };

  const closeMapModal = () => {
    setSelectedProjectForMap(null);
  };

  if (loading || !isLoaded) return <div className="text-center py-24">Cargando...</div>;
  if (error) return <div className="text-center py-24 text-red-600">Error: {error}</div>;

  return (
    <div className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Nuestras Iniciativas de Cambio</h1>
          <p className="mt-4 text-xl text-slate-600">
            Cada proyecto es un paso hacia un futuro más brillante y autosuficiente.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onVerMapaClick={() => openMapModal(project)}
            />
          ))}
        </div>
      </div>
      {/* El modal se renderiza aquí, fuera del grid, para no afectar el diseño */}
      <MapModal project={selectedProjectForMap} onClose={closeMapModal} />
    </div>
  );
};

export default ProjectsPage;

