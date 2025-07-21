
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const name = location.state?.name || 'Amigo/a';

  return (
    <div className="flex items-center justify-center py-20 lg:py-32 bg-sky-50">
      <div className="max-w-2xl mx-auto text-center p-8 bg-white rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
            <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
          ¡Gracias, {name}!
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Tu generosidad marca la diferencia. Gracias a tu apoyo, podemos continuar nuestra misión de llevar esperanza y ayuda a quienes más lo necesitan en África.
        </p>
        <p className="mt-4 text-slate-600">
          Pronto recibirás un correo electrónico con el resumen de tu donación.
        </p>
        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-block bg-sky-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-sky-700 transform hover:scale-105 transition-all duration-300"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
