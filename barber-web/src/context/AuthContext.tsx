import { createContext, ReactNode, useState, useEffect, use } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { api } from '../services/apiClient';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AuthContextData {
    user: UserProps | undefined; // Se futuramente tiver algum erro adicionei undefined e nao desativei o strictNullChecks
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signUp: (credentials: SignUpProps) => Promise<void>;
    logoutUser: () => Promise<void>;
}

interface UserProps{
    id: string;
    name: string;
    email: string;
    endereco: string | null;
    subscription: SubscriptionProps | null;
}

interface SubscriptionProps{
    id: string;
    status: string;
}

interface AuthProviderProps{
    children: ReactNode;
}

interface SignInProps{
    email: string;
    password: string;
}

interface SignUpProps{
    name: string;
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
    try {
        destroyCookie(null, '@barber.token', { path: '/' });
        Router.push('/login');
    } catch(err) {
        console.error('Falha ao destruir o cookie e redirecionar para login:', err.message);
        alert('Ocorreu um erro ao fazer logout. Por favor, tente novamente.');
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps | undefined >();
    const isAuthenticated = !!user;

    useEffect(() => {
        const { '@barber.token': token } = parseCookies();

        if(token){
            api.get('/me').then(response => {
                const { id, name, email, subscription, endereco } = response.data;

                setUser({
                    id,
                    name,
                    email,
                    endereco,
                    subscription,
                });
            }).catch(() => {
                signOut();
            });
        }
    }, []);

    async function signIn({ email, password }: SignInProps){
       try {
            const response = await api.post("/login", {
                email,
                password,
            });
            
            const { id, name, token, subscription, endereco } = response.data;

            setCookie(undefined, '@barber.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 1 hour
                path: '/',
            });

            setUser({
                id,
                name,
                email,
                endereco,
                subscription,
            });

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // rota para login apos a mensagem do toast
            setTimeout(() => {
                Router.push('/dashboard');
            }, 6000); // Espera 3 segundos antes de redirecionar
            

       } catch(err) {
            console.error("Falha ao tentar autenticar o usuário:", err.message);
            toast.error("Falha ao tentar autenticar o usuário. Por favor, tente novamente.");
       }
    }

    async function signUp({name, email, password}: SignUpProps){
        try{
            const response = await api.post("/users", {
                name,
                email,
                password,
            });
            // settime para redirecionar para login
            setTimeout(() => {
                Router.push('/login');
            }, 6000); // Espera 3 segundos antes de redirecionar
            

        }catch(err){
            console.log("Falha ao tentar cadastrar o usuário:", err);
        }
    }

    async function logoutUser(){
        try{
            destroyCookie(null, '@barber.token', { path: '/' });
            Router.push('/login');
            setUser(null)
        }catch(err){
            console.log("Falha ao tentar fazer logout:", err);
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}
<ToastContainer />