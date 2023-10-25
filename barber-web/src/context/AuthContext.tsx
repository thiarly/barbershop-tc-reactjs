import { createContext, ReactNode, useState } from 'react';
import { destroyCookie } from 'nookies';
import Router from 'next/router';

interface AuthContextData {
    user: UserProps | undefined; // Se futuramente tiver algum erro adicionei undefined e nao desativei o strictNullChecks
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
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

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
    console.log('Erro Logout');
    try{
        destroyCookie(null, '@barber.token', { path: '/' });
        Router.push('/login');
    }catch(err){
        console.log('Erro ao fazer logout');
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps | undefined >();
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInProps){
        console.log('Vamos fazer login');
        console.log({ email, password });
    }



    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}