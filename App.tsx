// =================================================================
// ARCHIVO 1: App.tsx (ACTUALIZADO)
// DESCRIPCIÓN: Se añaden las rutas para las páginas de Login y Registro.
// =================================================================
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ProjectsPage from './pages/ProjectsPage';
import CountriesPage from './pages/CountriesPage';
import DonationPage from './pages/DonationPage';
import ThankYouPage from './pages/ThankYouPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import LoginPage from './pages/LoginPage'; // ¡NUEVO! Importar LoginPage
import RegisterPage from './pages/RegisterPage'; // ¡NUEVO! Importar RegisterPage

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quienes-somos" element={<AboutUsPage />} />
          <Route path="/proyectos" element={<ProjectsPage />} />
          <Route path="/proyectos/:projectId" element={<ProjectDetailPage />} />
          <Route path="/paises" element={<CountriesPage />} />
          <Route path="/donar/:projectId?" element={<DonationPage />} />
          <Route path="/gracias" element={<ThankYouPage />} />
          {/* --- ¡NUEVAS RUTAS! --- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          {/* -------------------- */}
        </Routes>
      </main>
      <footer className="bg-slate-800 text-white p-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Alma ONG. Todos los derechos reservados.</p>
        <p className="mt-2">Unidos por un futuro mejor en África.</p>
      </footer>
    </div>
  );
};

export default App;