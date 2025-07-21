import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirige al inicio tras un login exitoso
    } catch (err: any) {
      setError('No se pudo iniciar sesión. Verifica tus credenciales.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center py-24 bg-slate-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-slate-900">Iniciar Sesión</h2>
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
          <button type="submit" disabled={loading} className="w-full px-4 py-2 font-semibold text-white bg-sky-600 rounded-md hover:bg-sky-700 disabled:bg-slate-400">
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        <div className="text-sm text-center">
          ¿No tienes una cuenta? <Link to="/registro" className="font-medium text-sky-600 hover:underline">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;