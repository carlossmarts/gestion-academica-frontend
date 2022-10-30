import React, { useState, useContext } from 'react'
import { Button, MenuList, Paper, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { useEstudiantePresenter } from '../../hooks/EstudiantesPresenter'
import { UserContext } from "../../context/UserContext";
import { descargar } from "../../UtilsMethods";



const Analitico = () => {

    const { traerAnalitico } = useEstudiantePresenter()
    const { user } = useContext(UserContext)


    function descargarAnalitico() {
        traerAnalitico(user.idUsuario).then((res) => {
            if (res) {
                console.log("traer analitico " + JSON.stringify(res));
                descargar(res, 'analitico.pdf')
                window.alert("Analitico listo")
            }
        })
    };

    return (
        <>
            <Button onClick={descargarAnalitico()} variant="contained" color="primary" >
                Descargar Analitico
            </Button>
        </>

    )
}

export default Analitico

const styles = {
    menuItem: {
        '&:selected': {
            backgroundColor: grey[500],
        },
        height: 50,
        color: blue[700],
        fontSize: 14,
    }
}
