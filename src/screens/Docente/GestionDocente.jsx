import { Box, Button, Grid, TextField, Typography, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect, useContext } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import { useDocentePresenter } from '../../hooks/DocentePresenter'
import { UserContext } from '../../context/UserContext';
import Loader from '../../components/commons/Loader'
import { styles } from '../../styles/styles'
import TablaFinales from '../../components/Docente/TablaFinales'
import { exportarComoExcel } from '../../UtilsMethods'


const GestionDocente = (props) => {
    const { user } = useContext(UserContext)

    const [comisiones, setComisiones] = useState([])
    const [comisionSeleccionada, setComisionSeleccionada] = useState({ idComision: 0 })
    const [inscriptos, setInscriptos] = useState([])
    const [loading, setLoading] = useState(false)

    const { traerComisionesDeDocente, traerAlumnosYNotas, actualizarNotas } = useDocentePresenter()

    const json = [{}

    ]

    useEffect(() => {
        setLoading(true)
        traerComisionesDeDocente()
            .then((res) => {
                setLoading(false)
                setComisiones(res ?? [])
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        if (comisionSeleccionada) {
            setLoading(true)
            traerAlumnosYNotas(comisionSeleccionada.idComision, user.idUsuario)
                .then((res) => {
                    setLoading(false)
                    console.log(JSON.stringify(res + "hello u"))
                    setInscriptos(res ?? [])
                })
                .catch(e => console.log(e))
        }
    }, [comisionSeleccionada])

    const subirArchivo = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                console.log(json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
            return json
        }
    }

    return (
        <>
            <Typography style={styles.title}>Gestion de Notas</Typography>
            {
                comisiones ?
                    <SeleccionarInstancia materias={comisiones} materiaSeleccionada={comisionSeleccionada} setMateriaSeleccionada={setComisionSeleccionada}></SeleccionarInstancia>
                    : null
            }
            {
                comisionSeleccionada.idComision !== 0 ?
                    <>
                        <TablaFinales inscriptos={inscriptos} ></TablaFinales>
                        <Box mx={3}>
                            <Grid container spacing={1} xs={4} justifyContent="flex-start" alignItems="flex-start" >
                                <Grid item xs={5}>
                                    <label htmlFor="upload-photo">
                                        <input
                                            style={{ display: 'none' }}
                                            id="upload-photo"
                                            name="upload-photo"
                                            type="file"
                                            onChange={subirArchivo}
                                        />

                                        <Button variant="contained" component="span">
                                            Subir Notas
                                        </Button>
                                    </label>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" onClick={() => { exportarComoExcel(json, 'coso') }} component="span">
                                        Descargar Planilla
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                    : null
            }
            {
                loading ? <Loader /> : null
            }
        </>
    )
}

export default GestionDocente

const SeleccionarInstancia = (props) => {

    const { materias, materiaSeleccionada, setMateriaSeleccionada } = props
    return (
        <Box mx={3} mt={3}>
            {
                materias.length !== 0 ?
                    <Grid container spacing={2} xs direction="row" >
                        <Grid item xs={8}>
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
                                    <MenuItem key={option.idComision} value={option}>
                                        {option.nombreMateria + " - " + option.descripcionInscripcion}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    : null
            }
        </Box>
    )
}