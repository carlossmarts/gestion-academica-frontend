import React, { useState } from 'react'

const newUser = {
    idUsuario: 0,
    tipoUsuario: "estudiante", //estudiante || docente || admin
    username: "",
    password: "",
    activo: true
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