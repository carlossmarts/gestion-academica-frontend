import { Box, Grid, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

const TablaFinales = (props) => {

    const {
        inscriptos
    } = props

    const columnasNotas =
        [
            { field: "dni", headerName: <b>DNI</b>, flex: 0.5 },
            { field: "nombre", headerName: <b>Nombre</b>, flex: 0.5 },
            { field: "apellido", headerName: <b>Apellido</b>, flex: 0.5 },
            { field: "primerParcial", headerName: <b>Primer Parcial</b>, flex: 0.5, editable: true },
            { field: "segundoparcial", headerName: <b>Segundo Parcial</b>, flex: 0.5, editable: true },
            { field: "notaCursada", headerName: <b>Nota Cursada</b>, flex: 0.5 }
        ]

    return (
        <>
            {
                inscriptos !== undefined && inscriptos.length !== 0 ?
                    <Grid container justify="center">
                        <Box p={3} style={{ width: '90%' }}>
                            <Paper m={10}>
                                <Box p={2}>
                                    <DataGrid
                                        rows={inscriptos}
                                        columns={columnasNotas}
                                        getRowId={row => row.idEstudiante}
                                        autoHeight={true}
                                        disableColumnMenu
                                    />
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                    :
                    < Typography>No hay inscriptos a esta instancia</Typography>
            }
        </>
    )
}

export default TablaFinales