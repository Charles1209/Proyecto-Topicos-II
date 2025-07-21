// =================================================================
// ARCHIVO 3: pages/DonationPage.tsx (ACTUALIZADO)
// DESCRIPCIÓN: Ahora detecta el proyecto y lo muestra.
// =================================================================
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DonationFormState } from '../types';

const predefinedAmounts = [10, 25, 50, 100];

// --- ¡NUEVO! Tipo simple para el proyecto ---
interface SelectedProject {
  id: string;
  title: string;
}

const DonationPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>(); // Leemos el ID
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null);
  const [isLoadingProject, setIsLoadingProject] = useState(true);

  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [formData, setFormData] = useState<DonationFormState>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<DonationFormState>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  // --- ¡NUEVO! useEffect para cargar el proyecto ---
  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/proyectos/${projectId}`);

          if (!response.ok) throw new Error('Proyecto no encontrado');
          const data = await response.json();
          setSelectedProject({ id: data.id, title: data.nombre });
        } catch (error) {
          console.error("Error al cargar el proyecto para donación:", error);
        } finally {
          setIsLoadingProject(false);
        }
      };
      fetchProject();
    } else {
      setIsLoadingProject(false);
    }
  }, [projectId]);
  // ---------------------------------------------

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(Number(value) || 0);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof DonationFormState]) {
        setErrors(prev => ({...prev, [name]: undefined}));
    }
  };
  
  const validateForm = (): boolean => {
      const newErrors: Partial<DonationFormState> = {};
      if (!formData.firstName.trim()) newErrors.firstName = "El nombre es obligatorio.";
      if (!formData.lastName.trim()) newErrors.lastName = "El apellido es obligatorio.";
      if (!formData.email.trim()) {
          newErrors.email = "El correo electrónico es obligatorio.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Formato de correo inválido.";
      }
      if (selectedAmount <= 0) {
          newErrors.firstName = (newErrors.firstName || '') + " Por favor, selecciona un monto válido.";
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Donation submitted:', { ...formData, amount: selectedAmount, projectId: selectedProject?.id });
      setIsSubmitting(false);
      navigate('/gracias', { state: { name: formData.firstName } });
    }, 1500);
  };

  return (
    <div className="py-12 lg:py-20 bg-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">Haz tu Donación</h1>
          <p className="text-center text-slate-500 mb-8">Tu contribución directa cambia vidas.</p>
          
          {/* --- ¡NUEVA SECCIÓN! --- */}
          {isLoadingProject ? (
            <p className="text-center my-4">Cargando información del proyecto...</p>
          ) : selectedProject && (
            <div className="my-6 p-4 bg-sky-50 border border-sky-200 rounded-md text-center">
              <p className="text-sm text-sky-700">Estás donando específicamente para el proyecto:</p>
              <p className="font-bold text-sky-800 text-lg">{selectedProject.title}</p>
            </div>
          )}
          {/* ----------------------- */}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-700 mb-4">Selecciona un monto (€)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {predefinedAmounts.map(amount => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountClick(amount)}
                    className={`p-4 rounded-lg font-bold text-lg border-2 transition-all duration-200 ${selectedAmount === amount && !customAmount ? 'bg-sky-500 border-sky-500 text-white scale-105' : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-sky-400'}`}
                  >
                    {amount}€
                  </button>
                ))}
              </div>
              <div className="mt-4">
                 <input
                  type="text"
                  placeholder="Otro monto"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full p-4 rounded-lg border-2 border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-700 mb-4">Tus datos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-600 mb-1">Nombre</label>
                  <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} className={`w-full p-3 rounded-md border-2 ${errors.firstName ? 'border-red-500' : 'border-slate-200'} focus:ring-1 focus:ring-sky-500 focus:border-sky-500`} required />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                 <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-600 mb-1">Apellido</label>
                  <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} className={`w-full p-3 rounded-md border-2 ${errors.lastName ? 'border-red-500' : 'border-slate-200'} focus:ring-1 focus:ring-sky-500 focus:border-sky-500`} required />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div className="mt-6">
                 <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Correo electrónico</label>
                 <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className={`w-full p-3 rounded-md border-2 ${errors.email ? 'border-red-500' : 'border-slate-200'} focus:ring-1 focus:ring-sky-500 focus:border-sky-500`} required />
                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-amber-600 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center text-lg"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : `Donar ${selectedAmount > 0 ? selectedAmount : ''}€`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
