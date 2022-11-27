import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { useContext } from 'react'


export const PrivateRoute =  ({children}: any) => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

   
    return children
}