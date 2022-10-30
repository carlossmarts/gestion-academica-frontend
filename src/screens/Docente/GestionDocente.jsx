import { Box, Button, Grid, Paper, TextField, Typography, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect, useContext } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import { useDocentePresenter } from '../../hooks/DocentePresenter'
import { UserContext } from '../../context/UserContext';
import { v4 as uuidv4 } from 'uuid';
import Loader from '../../components/commons/Loader'
import { styles } from '../../styles/styles'
import TablaMaterias from '../../components/Docente/TablaMaterias'
import {exportarComoExcel} from '../../UtilsMethods'


const GestionDocente = (props) => {

    const {
        inscribirse,
        cancelarInscripcion
    } = props

    const { user } = useContext(UserContext)

    const [materias, setMaterias] = useState([])
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(0)
    const [instanciasDeMateria, setInstanciasDeMateria] = useState([])
    const [instanciasDeMateriaSeleccionada, setInstanciasDeMateriaSeleccionada] = useState(0)
    const [inscriptos, setInscriptos] = useState([])
    const [loading, setLoading] = useState(false)

    const { traerMateriasDocente, traerInstanciasDeMateria, traerAlumnosYNotas, actualizarNotas } = useDocentePresenter()

    const json =[
        {
            "Concepto": "Psicologa",
            "Total": 8000,
            "Gastado": 8000,
            "Semana 1": 0,
            "Semana 2": 4000,
            "Semana 4": 4000
        },
        {
            "Concepto": "Nutricionista",
            "Total": 4000,
            "Gastado": 4000,
            "Semana 1": 0,
            "Semana 2": 0,
            "Semana 3": 4000
        },
        {
            "Concepto": "Tuenti",
            "Total": 1000,
            "Gastado": 1000,
            "Semana 1": 0,
            "Semana 2": 0,
            "Semana 4": 1000
        },
        {
            "Concepto": "Agua",
            "Total": 2000,
            "Gastado": 1500,
            "Semana 1": 500,
            "Semana 2": 0,
            "Semana 3": 500,
            "Semana 4": 500
        },
        {
            "Concepto": "Carniceria",
            "Total": 8000,
            "Gastado": 2000,
            "Semana 1": 2000
        },
        {
            "Concepto": "Verduleria",
            "Total": 8000,
            "Gastado": 1600,
            "Semana 1": 1600
        },
        {
            "Concepto": "Supermercado",
            "Total": 14000,
            "Gastado": 6900,
            "Semana 1": 3600,
            "Semana 2": 3300
        },
        {
            "Concepto": "Frutas congeladas",
            "Total": 4000,
            "Gastado": 0,
            "Semana 1": 0
        },
        {
            "Concepto": "Pedidos Ya",
            "Total": 8000,
            "Gastado": 2460,
            "Semana 1": 2460
        },
        {
            "Concepto": "Salidas",
            "Total": 10000,
            "Gastado": 4400,
            "Semana 1": 4400
        },
        {
            "Concepto": "otros",
            "Total": 0,
            "Gastado": 0,
            "Semana 1": 0
        }
    ]

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

    const columnasNotas =
        [
            { field: "nombre", headerName: <b>Nombre</b>, flex: 1 },
            { field: "apellido", headerName: <b>Apellido</b>, flex: 1 },
            { field: "primerParcial", headerName: <b>Primer Parcial</b>, flex: 1 },
            { field: "segundoparcial", headerName: <b>Segundo Parcial</b>, flex: 1 }
        ]

    const subirArchivo = (e) => {
        console.log("HOLU")
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
        }
    }


    const descargarArchivo = () => {
        console.log("subiendo archivo")
    }
    return (
        <>
            <Typography style={styles.title}> Materias Asignadas </Typography>
            {
                materias !== undefined && materias.length !== 0 ?
                    < TablaMaterias materias={materias} />
                    :
                    null
            }

            {
                materias ?
                    <>
                        <Box mt={4}>
                            <Typography style={styles.title}> Gestion de Notas</Typography>
                        </Box>
                        <Box mx={3} mt={3}>
                            {
                                materias.length !== 0 ?
                                    <Grid container spacing={2} xs direction="row" >
                                        <Grid item xs={5}>
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
                                        </Grid>
                                        <Grid item xs={5}>
                                            <TextField
                                                fullWidth
                                                name="idInscripcion"
                                                select
                                                size="small"
                                                label="Instancia"
                                                value={materiaSeleccionada}
                                                onChange={(e) => { setMateriaSeleccionada(e.target.value) }}
                                            >
                                                {materias.map((option) => (
                                                    <MenuItem key={option.idMateria} value={option.idMateria}>
                                                        {option.nombre}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>

                                    :
                                    null
                            }
                        </Box>

                    </>
                    :
                    null}
            {
                materiaSeleccionada !== 0 ?
                    <>
                        < TablaMaterias materias={materias} ></TablaMaterias>
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
                                        <Button variant="contained" onClick={() => {exportarComoExcel(json, 'coso')}} component="span">
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