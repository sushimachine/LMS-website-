import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../conf/conf";
import supabaseService from "../Auth/SupabaseService";

const Authcontext = createContext()

export function Authprovider({children}){
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const CheckCurrentUser = async() => {
            try{
                const data = await supabaseService.getCurrentUser()
                setUser(data)                    
            } catch{
                setUser(null)
            } finally{
                setIsLoading(false)
            }
        };

        CheckCurrentUser();

        const listener = supabaseService.onAuthChange((newUser) => setUser(newUser));

        return () => {
            return listener.unsubscribe()
        }
    }, [])
    const [isloginModalOpen, setIsloginMoalOpen] = useState(false)
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

    const [isSidebarOpen, setIsSidebaropen] = useState(false)
    const value = {
        user,
        isLoading,
        signup: supabaseService.createAccount,
        login: supabaseService.login,
        logout: supabaseService.logout,

        isloginModalOpen,
        OpenloginModal : () => setIsloginMoalOpen(true),
        closeloginModal : () => setIsloginMoalOpen(false),

        isSignupModalOpen,
        OpenSignupModal : () => setIsSignupModalOpen(true),
        closeSignupModal : () => setIsSignupModalOpen(false),

        isSidebarOpen,
        toggleSidebar : () => setIsSidebaropen(prev => !prev)

    };

    return (
    <Authcontext.Provider value={value}>
      {!isLoading && children}
    </Authcontext.Provider>
  );
}

export const useAuth = () => {
    return useContext(Authcontext)
}

