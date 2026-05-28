import { createContext, useContext, useEffect, useState } from "react"
import api from "../lib/api"

const AuthContext = createContext()

export default function AuthProvider({children}){
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            api.get('/users')
                .then(res=> setUser(res.data))
                .catch(()=> localStorage.removeItem('token'))
                .finally(()=> setLoading(false))
        }else{
            setLoading(false)
        }
    }, [])

    async function login(email, password) {
        const res = await api.post('/login', {email, password})
        const {access_token} = res.data
        localStorage.setItem('token', access_token)

        const userRes = await api.get('/users')
        setUser(userRes.data)

        return res.data
    }
    
    async function logout() {
        try{
            await api.post('/logout', {})
        }finally{
            localStorage.removeItem('token')
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}