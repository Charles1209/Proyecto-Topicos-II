import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }
    setError('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirige al inicio tras un registro exitoso
    } catch (err: any) {
      setError('No se pudo crear la cuenta. Inténtalo de nuevo.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center py-24 bg-slate-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-slate-900">Crear una Cuenta</h2>
        {error && <p className="p-3 text-center text-red-800 bg-red-100 rounded-md">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-700">Correo electrónico</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"/>
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-slate-700">Contraseña</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"/>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirmar Contraseña</label>
            <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"/>
          </div>
          <button type="submit" disabled={loading} className="w-full px-4 py-2 font-semibold text-white bg-sky-600 rounded-md hover:bg-sky-700 disabled:bg-slate-400">
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>
        <div className="text-sm text-center">
          ¿Ya tienes una cuenta? <Link to="/login" className="font-medium text-sky-600 hover:underline">Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;