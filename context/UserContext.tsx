// "use client";

// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import Cookies from 'js-cookie';
// interface User {
//   firstName: string;
//   email: string;
//   role: "etudiant" | "enseignant";
//   token: string;
// }

// interface UserContextType {
//   user: User | null;
//   login: (userData: User) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export function UserProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Préférez les cookies aux localStorage pour plus de sécurité
//     const token = Cookies.get('token');
//     const storedUser = localStorage.getItem("user");

//     if (token && storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         // Vérification supplémentaire de la validité du token
//         if (isTokenValid(token)) {
//           setUser(parsedUser);
//           setIsAuthenticated(true);
//         } else {
//           // Token invalide, déconnexion
//           logout();
//         }
//       } catch (error) {
//         console.error("Erreur de parsing du token", error);
//         logout();
//       }
//     }
//   }, []);

//   const login = (userData: User) => {
//     // Stockage sécurisé du token
    
//     Cookies.set('token', userData.token, { 
//       secure: process.env.NODE_ENV === 'production', 
//       httpOnly: true,
//       sameSite: 'strict',
//       expires: 7 // Expiration en jours
//     });

//     // Stockage local des informations utilisateur
//     localStorage.setItem("user", JSON.stringify(userData));
    
//     setUser(userData);
//     setIsAuthenticated(true);
    
//     console.log("Connexion utilisateur", userData);
//   };

//   const logout = () => {
//     // Suppression du token des cookies
//     Cookies.remove('token');
    
//     // Suppression des données utilisateur
//     localStorage.removeItem("user");
    
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   // Fonction de validation du token (à implémenter)
//   const isTokenValid = (token: string): boolean => {
//     try {
//       // Décodez et vérifiez le token JWT
//       // Vous devrez importer une bibliothèque comme jwt-decode
//       // const decoded = jwt.decode(token);
//       // return decoded && decoded.exp > Date.now() / 1000;
//       return !!token; // Placeholder - remplacez par une vraie validation
//     } catch (error) {
//       console.error("Erreur de validation du token", error);
//       return false;
//     }
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout, isAuthenticated }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUser() {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// }


'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Type pour les informations utilisateur
interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Type pour le contexte d'authentification
interface AuthContextProps {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

// Créer le contexte d'authentification
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Propriétés du provider d'authentification
interface AuthProviderProps {
  children: React.ReactNode;
}

// Provider d'authentification
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fonction pour effacer l'erreur
  const clearError = () => setError(null);

  // Fonction pour définir les informations d'authentification
  const setAuthInfo = (userData: User | null, authToken: string | null) => {
    setUser(userData);
    setToken(authToken);

    if (authToken) {
      localStorage.setItem('token', authToken);
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
      document.cookie = `token=${authToken}; path=/; max-age=${60*60*24}; SameSite=Strict`;
      console.log("token ajoute", authToken)

    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  // Fonction de connexion
  const login = async (email: string, password: string, role: string) => {
    setIsLoading(true);
    clearError();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }

      setAuthInfo(data.user, data.token);
    } catch (err: any) {
      setError(err.message);
      setAuthInfo(null, null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction d'inscription
  const register = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    clearError();

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur d\'inscription');
      }

      setAuthInfo(data.user, data.token);
    } catch (err: any) {
      setError(err.message);
      setAuthInfo(null, null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setAuthInfo(null, null);
    router.push('/');
  };

  // Vérifier l'authentification au chargement de la page
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          // Vérifier si le token est valide
          // const response = await fetch('/api/auth/me', {
          //   headers: {
          //     'Authorization': `Bearer ${storedToken}`,
          //   },
          // });
          
          // if (response.ok) {
          //   const data = await response.json();
          //   setAuthInfo(data.user, storedToken);
          // } else {
          //   setAuthInfo(null, null);
          // }
        } catch (err) {
          setAuthInfo(null, null);
        }
      } else {
        setAuthInfo(null, null);
      }
      
      setIsLoading(false); router.push("/dashboard")
    };
    
    initAuth();
  }, []);

  // Valeur du contexte
  const value: AuthContextProps = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};