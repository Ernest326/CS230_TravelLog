import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface UserContextType {
    loggedIn: boolean;
    login: (user:string, password: string) => void;
    logout: () => void;
    user: string;
    id: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState('');
    const [id, setId] = useState(0);

     // Check if logged in on page load
    const LOCAL_USER = 'userToken';
    const LOCAL_PASS = 'passToken';

    //Authenticate login
    const tryLogin = async (user: string, password: string) => {
        console.log("Logging in...")
        if (user && password) {
            axios.post('http://localhost:3000/user/login', {username: user, password: password})
                .then(response => {
                    if (response.status === 200) {
                        console.log("Login Successful")
                        setLoggedIn(true);
                        setUser(user);
                        setId(response.data.id);
                    }
                })
                .catch(error => {
                    console.log("Login Failed")
                    console.error(error);
                    setLoggedIn(false);
                    setUser('');
                    setId(0);
                }
            );
        }
    }

    //Check if we are logged in still
    useEffect(() => {
        const userToken = localStorage.getItem(LOCAL_USER);
        const passToken = localStorage.getItem(LOCAL_PASS);
        tryLogin(userToken || '', passToken || '');
    }, []);

    //Login function
    const login = (user: string, password: string) => {
        localStorage.setItem(LOCAL_USER, user);
        localStorage.setItem(LOCAL_PASS, password);
        tryLogin(user, password);
    };

    const logout = () => {
        localStorage.removeItem(LOCAL_USER);
        localStorage.removeItem(LOCAL_PASS);
        setLoggedIn(false);
        setUser('');
        setId(0);
    };

    return (
        <UserContext.Provider value={{ loggedIn, login, logout, user, id }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}