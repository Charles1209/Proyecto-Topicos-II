// =================================================================
// ARCHIVO: components/ProjectCard.tsx (VERSIÓN FINAL PARA MODAL)
// =================================================================
import React from 'react';
import { Link } from 'react-router-dom';

// La interfaz Project aquí puede ser más simple, ya que no necesita los datos del mapa.
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface ProjectCardProps {
  project: Project;
  onVerMapaClick: () => void; // Solo necesita la función para llamar, ya no necesita 'mapaVisible'
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onVerMapaClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      <img 
        className="w-full h-56 object-cover" 
        src={project.imageUrl} 
        alt={project.title}
        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/cccccc/333333?text=Imagen no disponible'; }}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">{project.title}</h3>
        <p className="text-slate-600 flex-grow mb-4">{project.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <Link to={`/proyectos/${project.id}`} className="text-sky-600 font-semibold hover:text-sky-700">
            Saber más →
          </Link>
          <button
            onClick={onVerMapaClick} // Al hacer clic, se llama a la función que abre el modal.
            className="px-4 py-2 text-sm font-bold text-white rounded-md transition-colors bg-sky-500 hover:bg-sky-600"
          >
            Ver en Mapa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
