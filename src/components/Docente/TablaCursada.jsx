import { Box, Grid, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';

const TablaCursada = (props) => {

    const {
        inscriptos,
        actualizarNotaEnTabla
    } = props

    const columnasNotas =
        [
            { field: "dni", headerName: <b>DNI</b>, flex: 0.5 },
            { field: "nombre", headerName: <b>Nombre</b>, flex: 0.5 },
            { field: "apellido", headerName: <b>Apellido</b>, flex: 0.5 },
            { field: "primerParcial", headerName: <b>Primer Parcial</b>, flex: 0.5, editable: true },
            { field: "segundoParcial", headerName: <b>Segundo Parcial</b>, flex: 0.5, editable: true },
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
                                    getRowId={row => row.dni}
                                    autoHeight={true}
                                    disableColumnMenu
                                    onCellEditCommit={actualizarNotaEnTabla}
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

export default TablaCursada