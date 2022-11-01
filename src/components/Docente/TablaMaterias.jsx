import { Box, Grid, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

const TablaMaterias = (props) => {

    const {
        materias
    } = props

    const columnasMaterias =
        [
            { field: "nombre", headerName: <b>Nombre</b>, flex: 1 },
            { field: "carrera", headerName: <b>Carrera</b>, flex: 1 },
            { field: "turno", headerName: <b>Turno</b>, flex: 1 },
            { field: "rangoHorario", headerName: <b>Horario</b>, flex: 1 }
        ]

    return (
        <>
            {
                materias !== undefined && materias.length !== 0 ?
                    <Grid container justify="center">
                        <Box p={3} style={{ width: '90%' }}>
                            <Paper m={10}>
                                <Box p={2}>
                                    <DataGrid
                                        rows={materias}
                                        columns={columnasMaterias}
                                        getRowId={row => row.idMateria}
                                        autoHeight={true}
                                        disableColumnMenu
                                    />
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                    :
                    < Typography>No ha sido asignado a ninguna materia</Typography>
            }
        </>
    )
}

export default TablaMaterias