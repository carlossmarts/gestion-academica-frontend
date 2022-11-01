import { Typography, Button, Paper, Grid, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect, useContext } from 'react';
import { useEstudiantePresenter } from '../../hooks/EstudiantesPresenter'
import Loader from '../../components/commons/Loader'
import { styles } from '../../styles/styles'
import { UserContext } from '../../context/UserContext';


const MateriasInscripto = () => {
    const [loading, setLoading] = useState(false)
    const [materiasInscripto, setMateriasInscripto] = useState([])

    const { user } = useContext(UserContext)
    const { traerInscripcionesAlumno, bajaInscripcionEstudiante } = useEstudiantePresenter()

    useEffect(() => {
        traerInscripcionesPrevias()
    }, [])

    const traerInscripcionesPrevias = () => {
        setLoading(true)
        traerInscripcionesAlumno(user.idUsuario)
            .then((res) => {
                Array.isArray(res) ? setMateriasInscripto(res) : setMateriasInscripto([res])
                setLoading(false)
            })
            .catch(e => console.log(e))
    }

    const renderDetailsButton = (params) => {
        return (
            <>{
                materiasInscripto && materiasInscripto.length !== 0 && params.row.estado === "Activo" ?
                    <Button
                        variant="text"
                        color="primary"
                        style={{ marginLeft: 16 }}
                        onClick={() => {
                            if (window.confirm('¿Estás seguro de que querés cancelar tu inscripción?')) {
                                setLoading(true)
                                bajaInscripcionEstudiante(params.row.idDetalleInscripcion).then((res) => {
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
                    null}</>
        )
    }

    const columns = [
        { field: "materia", headerName: <strong>Materia</strong>, flex: 0.8, headerAlign: 'center', align: 'left' },
        { field: "turno", headerName: <strong>Turno</strong>, flex: 0.3, headerAlign: 'center', align: 'left' },
        { field: "diaHorario", headerName: <strong>Día/Horario</strong>, flex: 0.5, headerAlign: 'center', align: 'left' },
        { field: "anio", headerName: <strong>Año</strong>, flex: 0.3, headerAlign: 'center', align: 'left' },
        { field: "docente", headerName: <strong>Docentes</strong>, flex: 0.5, headerAlign: 'center', align: 'left' },
        { field: "estado", headerName: <strong>Estado</strong>, flex: 0.3, headerAlign: 'center', align: 'left' },
        { field: "acciones", headerName: <strong></strong>, flex: 0.8, headerAlign: 'center', align: 'center', renderCell: renderDetailsButton }];


    return (
        <>
            <Typography style={styles.title}> Materias Asignadas </Typography>
            {
                materiasInscripto.length !== 0 ?
                    <Grid container justify="center">
                        <Box p={3} style={{ width: '90%' }}>
                            <Paper m={10}>
                                <Box p={2}>
                                    <DataGrid
                                        rows={materiasInscripto}
                                        columns={columns}
                                        pageSize={10}
                                        getRowId={row => row.idDetalleInscripcion}
                                        autoHeight={true}
                                        disableColumnMenu
                                    />
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                    : !loading ?
                        < Typography>No existen inscripciones disponibles para la seleccion</Typography>
                        : null
            }
            {
                loading ? <Loader /> : null
            }
        </>
    )
}

export default MateriasInscripto