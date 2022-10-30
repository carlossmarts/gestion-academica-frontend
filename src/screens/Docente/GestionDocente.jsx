import { Box, Button, Grid, Paper, TextField, Typography, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect, useContext } from 'react';
import { useDocentePresenter } from '../../hooks/DocentePresenter'
import { UserContext } from '../../context/UserContext';
import { v4 as uuidv4 } from 'uuid';


const GestionDocente = (props) => {

    const {
        inscribirse,
        cancelarInscripcion
    } = props

    const { user } = useContext(UserContext)

    const [materiaSeleccionada, setMateriaSeleccionada] = useState(0)
    const [materias, setMaterias] = useState([])
    const [inscriptos, setInscriptos] = useState([])

    const { traerMateriasDocente, traerAlumnosYNotas, actualizarNotas } = useDocentePresenter()

    useEffect(() => {
        traerMateriasDocente()
            .then(res => setMaterias(res))
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        traerAlumnosYNotas(materiaSeleccionada, user.idUsuario)
            .then(res => setInscriptos(res))
            .catch(e => console.log(e))
    }, [materiaSeleccionada])

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


    const columnas =
        [
            { field: "nombre", headerName: <b>Nombre</b>, width: 150 },
            { field: "apellido", headerName: <b>Apellido</b>, width: 300 },
            { field: "primerParcial", headerName: <b>Primer Parcial</b>, width: 150 },
            { field: "segundoparcial", headerName: <b>Segundo Parcial</b>, width: 150 }
        ]

    return (

        <>
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
                            : < Typography>Cargando materias...</Typography>
                        : null
                }
            </Grid>
            {
                materiaSeleccionada !== 0 ?
                    inscriptos.length !== 0 ?
                        < Typography>Cargando Inscriptos...</Typography> :
                        <Grid container justify="center">
                            <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <Box style={{ height: '450px', width: '600px' }}>
                                    <DataGrid
                                        rows={inscriptos}
                                        columns={columnas}
                                        pageSize={6}
                                        getRowId={(row) => uuidv4()}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    :
                    <></>
            }
        </>
    )
}

export default GestionDocente