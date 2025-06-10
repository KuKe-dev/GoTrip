/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from 'react';
import { getCookie, checkIsLogged } from '../scripts/logged';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const login = await checkIsLogged();
                setUser(login);
                setIsLoading(false);
            } catch (error) {
                console.error('Error verifying authentication:', error);
            }

        }

        verifyAuth();

    }, []);

    const value = {
    user,
    isLoading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );

}

export function useAuth() {
    return useContext(AuthContext);
}