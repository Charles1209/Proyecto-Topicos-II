// =================================================================
// PASO 3: ACTUALIZAR EL CONTEXTO DE AUTENTICACIÓN (context/AuthContext.tsx)
// DESCRIPCIÓN: Este componente manejará el estado del usuario en toda la app.
// =================================================================
import React, { useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase'; // Importamos desde nuestro nuevo archivo de config
import { User, onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
currentUser: User | null;
loading: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
const context = useContext(AuthContext);
if (context === undefined) {
throw new Error('useAuth must be used within an AuthProvider');
}
return context;
}

interface AuthProviderProps {
children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
const [currentUser, setCurrentUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
// onAuthStateChanged es un "oyente" de Firebase que se activa
// cada vez que un usuario inicia o cierra sesión.
const unsubscribe = onAuthStateChanged(auth, user => {
setCurrentUser(user);
setLoading(false);
});

return unsubscribe; // Se desuscribe al desmontar el componente
}, []);

const value = {
currentUser,
loading,
};

return (
<AuthContext.Provider value={value}>
{!loading && children}
</AuthContext.Provider>
);
}