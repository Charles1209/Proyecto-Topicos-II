// =================================================================
// ARCHIVO 2: components/Header.tsx (ACTUALIZADO)
// DESCRIPCIÓN: Ahora muestra botones de Login/Registro o el estado del usuario y un botón de Logout.
// =================================================================
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ¡NUEVO! Importar el hook de autenticación
import { auth } from '../firebase'; // ¡NUEVO! Importar la instancia de auth
import { signOut } from 'firebase/auth'; // ¡NUEVO! Importar la función de signOut

const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Quiénes Somos', path: '/quienes-somos' },
  { name: 'Proyectos', path: '/proyectos' },
  { name: 'Países', path: '/paises' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth(); // ¡NUEVO! Obtenemos el usuario actual
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirige al login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const linkClasses = "text-slate-600 hover:text-sky-500 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkClasses = "text-sky-600 font-bold";

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-slate-800">
              Alma
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `${linkClasses} ${isActive ? activeLinkClasses : ''}`
                  }
                  end={link.path === '/'}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {/* --- ¡NUEVA LÓGICA CONDICIONAL! --- */}
            {currentUser ? (
              <>
                <span className="text-sm text-slate-500 mr-4">Hola, {currentUser.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors duration-300 text-sm font-semibold"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-slate-600 hover:text-sky-500 transition-colors duration-300 text-sm font-semibold"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  className="ml-2 px-4 py-2 bg-sky-500 text-white rounded-md shadow-sm hover:bg-sky-600 transition-colors duration-300 text-sm font-semibold"
                >
                  Registrarse
                </Link>
              </>
            )}
             <Link
              to="/donar"
              className="ml-4 px-4 py-2 bg-amber-500 text-white rounded-md shadow-sm hover:bg-amber-600 transition-colors duration-300 text-sm font-semibold"
            >
              Donar ahora
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-slate-100 inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-600 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-sky-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${linkClasses} ${isActive ? activeLinkClasses : ''}`
                }
                 end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="border-t border-slate-200 my-2"></div>
            {/* --- ¡NUEVA LÓGICA CONDICIONAL PARA MÓVIL! --- */}
            {currentUser ? (
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="block w-full text-left mt-2 px-3 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 font-semibold"
              >
                Cerrar Sesión ({currentUser.email?.split('@')[0]})
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${linkClasses}`}>Iniciar Sesión</Link>
                <Link to="/registro" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${linkClasses}`}>Registrarse</Link>
              </>
            )}
            <Link
              to="/donar"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left mt-2 px-4 py-2 bg-amber-500 text-white rounded-md shadow-sm hover:bg-amber-600 transition-colors duration-300 font-semibold"
            >
              Donar ahora
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
