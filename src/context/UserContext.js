import React, { useState, useEffect } from 'react'

const newUser = {
    idUsuario: 0,
    idTipoUsuario: 0, //(1; estudiante), (2; docente), (3; admin)
    nombre: "",
    apellido: "",
    dni:"",
    correo: "",
    celular:"",
    idCarrera:0,
    username: "",
    clave: "",
    forzarClave: true
}

export const UserContext = React.createContext({})

const UserProvider = ({children}) =>{
    const [user, setUser] = useState(newUser)

    const refreshUser = ()=>{
        setUser(newUser)
    }

    return(
        <UserContext.Provider value={{user, setUser, refreshUser}}>
            {children}
        </UserContext.Provider>
    )

}

export default UserProvider