// =================================================================
// ARCHIVO: pages/HomePage.tsx (CORREGIDO Y MEJORADO)
// DESCRIPCIÓN: Se añaden nuevas secciones para diferenciarla de la página de proyectos.
// =================================================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- Interfaz para los datos del proyecto ---
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

// --- Componente de tarjeta específico para la página de inicio ---
const HomePageProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out h-full flex flex-col">
      <img 
        className="w-full h-48 object-cover" 
        src={project.imageUrl} 
        alt={project.title} 
        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/cccccc/333333?text=Imagen'; }}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-slate-800">{project.title}</h3>
        <p className="text-slate-600 mb-4 overflow-hidden flex-grow">{project.description}</p>
        <Link 
          to="/proyectos" 
          className="font-semibold text-sky-600 hover:text-sky-700 transition-colors duration-300 mt-auto"
        >
          Ver todos los proyectos &rarr;
        </Link>
      </div>
    </div>
  );
};


const HomePage: React.FC = () => {
  const [keyProjects, setKeyProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKeyProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/proyectos`);

        if (!response.ok) {
          throw new Error('No se pudieron cargar los proyectos');
        }
        const allProjects = await response.json();
        const formattedProjects = allProjects.slice(0, 3).map((p: any) => ({
          id: p.id,
          title: p.nombre,
          description: p.descripcion,
          imageUrl: p.imagenUrl,
        }));
        setKeyProjects(formattedProjects);
      } catch (error) {
        console.error("Error fetching key projects:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchKeyProjects();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white text-center">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://picsum.photos/seed/africa/1600/900')" }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">Transformando vidas en África</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-light">Tu apoyo es la esperanza que construye futuros.</p>
          <Link 
            to="/donar" 
            className="mt-8 inline-block bg-amber-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-amber-600 transform hover:scale-105 transition-all duration-300"
          >
            Únete a la Causa
          </Link>
        </div>
      </section>

      {/* --- ¡NUEVA SECCIÓN: NUESTRA MISIÓN! --- */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Nuestra Misión</h2>
          <p className="mt-4 text-lg text-slate-600">
            Creemos en un mundo donde cada persona, sin importar dónde nazca, tenga la oportunidad de alcanzar su máximo potencial. Nuestra misión es implementar proyectos sostenibles de salud, educación y desarrollo económico que empoderen a las comunidades africanas para construir un futuro próspero y autosuficiente.
          </p>
        </div>
      </section>

      {/* --- ¡NUEVA SECCIÓN: IMPACTO EN CIFRAS! --- */}
      <section className="py-16 lg:py-24 bg-sky-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Nuestro Impacto en Cifras</h2>
            <p className="mt-4 text-lg text-sky-200">Cada número representa una vida cambiada gracias a tu apoyo.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <p className="text-5xl font-extrabold text-amber-400">+10,000</p>
              <p className="mt-2 text-lg font-semibold text-sky-100">Personas con acceso a agua potable</p>
            </div>
            <div className="p-4">
              <p className="text-5xl font-extrabold text-amber-400">+5,000</p>
              <p className="mt-2 text-lg font-semibold text-sky-100">Niños y niñas en programas educativos</p>
            </div>
            <div className="p-4">
              <p className="text-5xl font-extrabold text-amber-400">+1,500</p>
              <p className="mt-2 text-lg font-semibold text-sky-100">Madres capacitadas en nutrición</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Projects Section */}
      <section className="py-16 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Nuestros Proyectos Clave</h2>
            <p className="mt-4 text-lg text-slate-600">Con cada proyecto, sembramos una semilla de cambio.</p>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <p>Cargando proyectos...</p>
            ) : (
              keyProjects.map(project => (
                <HomePageProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
