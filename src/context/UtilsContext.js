import React, { useState, useEffect } from 'react'
import {useAdministracionPresenter} from "../hooks/AdministracionPresenter";



export const UtilsContext = React.createContext({})

const UtilsProvider = ({children}) =>{

    const {
        getCarreras, defaultCarrera,
        getTurnos, defaultTurno
    } = useAdministracionPresenter()
    const [carreras, setCarreras] = useState([defaultCarrera]);
    const [turnos, setTurnos] = useState([defaultTurno]);

    useEffect(()=>{
        getCarreras()
            .then(data => setCarreras(data))
            .catch(e=>console.log(e))
        getTurnos()
            .then(data => setTurnos(data))
            .catch(e=>console.log(e))

    },[])

    return(
        <UtilsContext.Provider value={{carreras, turnos}}>
            {children}
        </UtilsContext.Provider>
    )

}

export default UtilsProvider