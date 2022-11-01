import { Box, Button, Grid, Paper, TextField, Typography, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState, useEffect, useContext } from 'react';
import { useEstudiantePresenter } from '../../hooks/EstudiantesPresenter'
import { UserContext } from '../../context/UserContext';
import Loader from '../../components/commons/Loader'
import { styles } from '../../styles/styles'



const GestionInscripcionesAlumno = (props) => {
    const { user } = useContext(UserContext)

    const emptyMaterias = {
        diaHorario: '',
        docente: '',
        idComision: '',
        idDia: '',
        materia: '',
        turno: ''
    }

    const [ciclosInscripcion, setCiclosInscripcion] = useState([])
    const [cicloInscripcionSeleccionado, setCicloInscripcionSeleccionado] = useState(0)
    const [materias, setMaterias] = useState([emptyMaterias])
    const [materiasInscripto, setMateriasInscripto] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingMaterias, setLoadingMaterias] = useState(false)
    const [loadingInscripcionesPrevias, setLoadingInscripcionesPrevias] = useState(false)



    const { traerTipoInscripciones, traerMateriasPorInscripcionPorCarrera, traerInscripcionesAlumno, altaInscripcionEstudiante, bajaInscripcionEstudiante } = useEstudiantePresenter()

    const traerInscripcionesPrevias = () => {
        setLoadingInscripcionesPrevias(true)
        traerInscripcionesAlumno(user.idUsuario)
            .then((res) => {
                console.log("HELLO " + JSON.stringify(res))
                setMateriasInscripto(res)
                setLoadingInscripcionesPrevias(false)
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        setLoading(true)
        traerInscripcionesPrevias()
        traerTipoInscripciones()
            .then((res) => {
                setLoading(false)
                setCiclosInscripcion(res)
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {

        if (cicloInscripcionSeleccionado !== 0) {
            setLoadingMaterias(true)
            traerMateriasPorInscripcionPorCarrera(cicloInscripcionSeleccionado, user.idCarrera)
                .then((res) => {
                    setLoadingMaterias(false)
                    setMaterias(res ?? [])
                })
                .catch(e => console.log(e))
        }
    }, [cicloInscripcionSeleccionado])


    useEffect(() => {
        console.log(JSON.stringify(cicloInscripcionSeleccionado) +
            " test")
    }, [cicloInscripcionSeleccionado])

    const renderDetailsButton = (params) => {
        return (
            <>{
                materiasInscripto && materiasInscripto.find((e) => { return e.materia === params.row.materia && e.estado == "Activo" }) ?
                    <Button
                        variant="text"
                        color="primary"
                        style={{ marginLeft: 16 }}
                        onClick={() => {
                            if (window.confirm('¿Estás seguro de que querés cancelar tu inscripción?')) {
                                setLoading(true)
                                const idBajaComision = materiasInscripto.find(e => e.materia === params.row.materia).idDetalleInscripcion
                                bajaInscripcionEstudiante(idBajaComision).then((res) => {
                                    if (res === "SUCCESS") {
                                        setLoading(false)
                                        window.alert("Inscripcion cancelada")
                                    }
                                })
                            }
                        }}
                    >
                        Cancelar Inscripción
                    </Button>
                    :
                    <Button
                        variant="text"
                        color="primary"
                        style={{ marginLeft: 16 }}
                        onClick={() => {
                            setLoading(true)
                            altaInscripcionEstudiante(user.idUsuario, cicloInscripcionSeleccionado, params.row.idComision).then((res) => {
                                setLoading(false)
                                if (res === "SUCCESS") {
                                    window.alert("Inscripcion confirmada")
                                } else {
                                    window.alert("Horarios superpuestos con otra materia, inscripcion cancelada")
                                }
                            })
                        }
                        }
                    >
                        Solicitar Inscripción
                    </Button>}
            </>
        )
    }

    const columns = [
        { field: "materia", headerName: <strong>Materia</strong>, flex: 1, headerAlign: 'center', align: 'left' },
        { field: "turno", headerName: <strong>Turno</strong>, flex: 0.5, headerAlign: 'center', align: 'left' },
        { field: "diaHorario", headerName: <strong>Día/Horario</strong>, flex: 0.75, headerAlign: 'center', align: 'left' },
        { field: "docente", headerName: <strong>Docentes</strong>, flex: 0.5, headerAlign: 'center', align: 'left' },
        { field: "acciones", headerName: <strong></strong>, flex: 1, headerAlign: 'center', align: 'center', renderCell: renderDetailsButton }];

    return (

        <>
            <Box mb={4}>
                <Typography style={styles.title}> Incripciones </Typography>
            </Box>

            <Box mx={4}> 
            <Grid item container xs={12} sm={6}>
                {
                    ciclosInscripcion !== undefined ?
                        ciclosInscripcion.length !== 0 ?

                            <TextField
                                fullWidth
                                name="idInscripcion"
                                select
                                size="small"
                                label="Seleccionar inscripción"
                                value={cicloInscripcionSeleccionado.idInscripcion}
                                onChange={(e) => { setCicloInscripcionSeleccionado(e.target.value) }}
                            >
                                {ciclosInscripcion.map((option) => (
                                    <MenuItem key={option.idCarrera} value={option.idInscripcion}>
                                        {option.descripcion}
                                    </MenuItem>
                                ))}
                            </TextField>
                            : < Typography>Cargando inscripciones...</Typography>
                        : null
                }</Grid>
            </Box>

            {
                materias.length !== 0 ?
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
                    < Typography>No existen inscripciones disponibles para la seleccion</Typography>
            }
            {
                loading || loadingMaterias || loadingInscripcionesPrevias ? <Loader /> : null
            }
        </>
    )
}

export default GestionInscripcionesAlumno