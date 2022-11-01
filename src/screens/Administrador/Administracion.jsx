import React, {useState, useEffect} from 'react'
import {Grid} from "@mui/material";
import MenuLateral from "../../components/Administrador/MenuLateral";
import AltaUsuarios from '../../components/Administrador/AltaUsuarios';
import GestionCuatrimestres from '../../components/Administrador/GestionCuatrimestres'
import GestionExamenes from '../../components/Administrador/GestionExamenes'
import GestionInscripciones from '../../components/Administrador/GestionInscripciones'

const Administracion = () => {

    const [selected, setSelected] = useState("")
    useEffect(() => {
        console.log(selected +
            " seleccionado")
    }, [selected])


    return (
        <Grid container direction='row' alignItems="flex-start">
            <Grid item  xs={12} sm={3}container >
                <MenuLateral
                    selected={selected}
                    setSelected={setSelected}
                />
            </Grid>
            <Grid item  xs={12} sm={9}container >
                {
                    selected === "altaUsuarios" ?
                        <AltaUsuarios/>
                        : null
                }
                {
                    selected === "cuatrimestres" ?
                        <GestionCuatrimestres/>
                        : null
                }
                {
                    selected === "examenes" ?
                        <GestionExamenes/>
                        : null
                }
                {
                    selected === "inscripciones" ?
                        <GestionInscripciones/>
                        : null
                }
            </Grid>
        </Grid>
    )
}

export default Administracion