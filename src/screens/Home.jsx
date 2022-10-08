import React, { useContext } from 'react'
import {
    Typography,
    Box
} from '@mui/material'
import { UserContext } from '../context/UserContext'
import Administracion from "./Administrador/Administracion";



const Home = () => {
    const context = useContext(UserContext)
    const {user} = context
    return (
        <Box>
            {
                user.idTipoUsuario === 1 ? //home estudiante
                    <Typography variant="h4"> Home Estudiante</Typography>
                : null
            }
            {
                user.idTipoUsuario === 2 ? //home Docente
                    <Typography variant="h4"> Home Docente</Typography>
                : null
            }
            {
                user.idTipoUsuario === 3 ? //home estudiante
                    <Administracion/>
                : null
            }
        </Box>
    )
}

export default Home