import { Box, Button, Grid, Paper, TextField, Typography, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState, useEffect, useContext } from 'react';
import { useInscripcionesPresenter } from '../../hooks/InscripcionesPresenter'
import { UserContext } from '../../context/UserContext';

const GestionInscripcionesAlumno = (props) => {

    const {
        inscribirse,
        cancelarInscripcion
    } = props

    const { user } = useContext(UserContext)

    const [ciclosInscripcion, setCiclosInscripcion] = useState([])
    const [cicloInscripcionSeleccionado, setCicloInscripcionSeleccionado] = useState(0)
    const [materias, setMaterias] = useState([])
    const [materiasInscripto, setMateriasInscripto] = useState([])

    const { traerTipoInscripciones, traerMateriasPorInscripcionPorCarrera, traerInscripcionesAlumno, altaInscripcionEstudiante, bajaInscripcionEstudiante } = useInscripcionesPresenter()

    useEffect(() => {
        traerTipoInscripciones()
            .then(res => setCiclosInscripcion(res))
            .catch(e => console.log(e))

        traerInscripcionesAlumno()
            .then(res => setMateriasInscripto(res))
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        traerMateriasPorInscripcionPorCarrera(cicloInscripcionSeleccionado, user.idCarrera)
            .then(res => setMaterias(res))
            .catch(e => console.log(e))
    }, [cicloInscripcionSeleccionado])

    useEffect(() => {
        console.log(JSON.stringify(materiasInscripto) +
            "UPDATEADO")
    }, [materiasInscripto])

    useEffect(() => {
        console.log(JSON.stringify(ciclosInscripcion) +
            "234324")
    }, [ciclosInscripcion])


    const renderDetailsButton = (params) => {
        return (
            <>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        if (window.confirm('¿Estás seguro de que querés cancelar tu inscripción?')) {
                            cancelarInscripcion(params.row.idComision).then((res) => { if (res === 204) window.location.reload() })
                        }
                    }}
                >
                    Cancelar Inscripción
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        if (window.confirm('¿Estás seguro de que querés cancelar tu inscripción?')) {
                            inscribirse(params.row.idComision).then((res) => { if (res === 204) window.location.reload() })
                        }
                    }}
                >
                    Incribirse
                </Button>
            </>
        )
    }

    const columns = [
        { field: "materia", headerName: <strong>Materia</strong>, flex: 1, headerAlign: 'center', align: 'center' },
        { field: "dias", headerName: <strong>Dias</strong>, flex: 1, headerAlign: 'center', align: 'center' },
        { field: "docentes", headerName: <strong>Docentes</strong>, flex: 0.5, headerAlign: 'center', align: 'center' },
        { field: "acciones", headerName: <strong></strong>, flex: 1, headerAlign: 'center', align: 'center', renderCell: renderDetailsButton }];

    return (

        <>
            <Grid item container xs={12} sm={6}>
                {
                    ciclosInscripcion !== undefined ?
                        ciclosInscripcion.length !== 0 ?
                            <TextField
                                fullWidth
                                name="idInscripcion"
                                select
                                size="small"
                                label="Inscripcion"
                                value={cicloInscripcionSeleccionado}
                                onChange={(e) => { setCicloInscripcionSeleccionado(e.target.value) }}
                            >
                                {ciclosInscripcion.map((option) => (
                                    <MenuItem key={option.idCarrera} value={option.idInscripcion}>
                                        {option.instancia}
                                    </MenuItem>
                                ))}
                            </TextField>
                            : < Typography>Cargando carreras...</Typography>
                        : null
                }
            </Grid>
            {
                cicloInscripcionSeleccionado !== 0 ?
                    <Grid container justify="center">
                        <Box p={3} style={{ width: '90%' }}>
                            <Paper m={10}>
                                <Box p={2}>
                                    <DataGrid
                                        rows={materias}
                                        columns={columns}
                                        pageSize={10}
                                        getRowId={row => row.idComision}
                                        autoHeight={true}
                                        disableColumnMenu
                                    />
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                    :
                    <></>
            }
        </>
    )
}

export default GestionInscripcionesAlumno