import { Box, Button, Grid, Paper, TextField, Typography, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect, useContext } from 'react';
import { useDocentePresenter } from '../../hooks/DocentePresenter'
import { UserContext } from '../../context/UserContext';
import { v4 as uuidv4 } from 'uuid';
import Loader from '../../components/commons/Loader'
import TablaMaterias from '../../components/Docente/TablaMaterias'




const GestionDocente = (props) => {

    const {
        inscribirse,
        cancelarInscripcion
    } = props

    const { user } = useContext(UserContext)

    const [materiaSeleccionada, setMateriaSeleccionada] = useState(0)
    const [materias, setMaterias] = useState([])
    const [inscriptos, setInscriptos] = useState([])
    const [loading, setLoading] = useState(false)

    const { traerMateriasDocente, traerAlumnosYNotas, actualizarNotas } = useDocentePresenter()

    useEffect(() => {
        setLoading(true)
        traerMateriasDocente()
            .then((res) => {
                setLoading(false)
                setMaterias(res ?? [])
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        if (materiaSeleccionada !== 0) {
            setLoading(true)
            traerAlumnosYNotas(materiaSeleccionada, user.idUsuario)
                .then((res) => {
                    setLoading(false)
                    setInscriptos(res ?? [])
                })
                .catch(e => console.log(e))
        }
    }, [materiaSeleccionada])

    const columnasMaterias =
        [
            { field: "nombre", headerName: <b>Nombre</b>, flex: 1 },
            { field: "carrera", headerName: <b>Carrera</b>, flex: 1 },
            { field: "turno", headerName: <b>Turno</b>, flex: 1 },
            { field: "rangoHorario", headerName: <b>Horario</b>, flex: 1 }
        ]

    const columnasNotas =
        [
            { field: "nombre", headerName: <b>Nombre</b>,  flex: 1 },
            { field: "apellido", headerName: <b>Apellido</b>, flex: 1 },
            { field: "primerParcial", headerName: <b>Primer Parcial</b>, flex: 1},
            { field: "segundoparcial", headerName: <b>Segundo Parcial</b>, flex: 1 }
        ]

    return (
        <>
            {
                materias !== undefined && materias.length !== 0 ?
                    < TablaMaterias materias={materias}/>
                    :
                    null
            }

            <Grid item container xs={12} sm={6}>
                {
                    materias !== undefined ?
                        materias.length !== 0 ?
                            <TextField
                                fullWidth
                                name="idInscripcion"
                                select
                                size="small"
                                label="Materia"
                                value={materiaSeleccionada}
                                onChange={(e) => { setMateriaSeleccionada(e.target.value) }}
                            >
                                {materias.map((option) => (
                                    <MenuItem key={option.idMateria} value={option.idMateria}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                            </TextField>
                            : null
                        : null
                }
            </Grid>
            {
                loading ? <Loader /> : null
            }
        </>
    )
}

export default GestionDocente