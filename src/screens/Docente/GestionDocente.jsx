import { Box, Button, Grid, TextField, Typography, MenuItem } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import { useDocentePresenter } from '../../hooks/DocentePresenter'
import { UserContext } from '../../context/UserContext';
import Loader from '../../components/commons/Loader'
import { styles } from '../../styles/styles'
import TablaFinal from '../../components/Docente/TablaFinal'
import TablaCursada from '../../components/Docente/TablaCursada'
import { getCurrentDate } from '../../UtilsMethods'


const GestionDocente = (props) => {
    const { user } = useContext(UserContext)

    const [comisiones, setComisiones] = useState([])
    const [comisionSeleccionada, setComisionSeleccionada] = useState({ idComision: 0 })
    const [inscriptos, setInscriptos] = useState([])
    const [inscriptosConSubida, setInscriptosConSubida] = useState([])
    const [loading, setLoading] = useState(false)
    const [dentroDeFecha, setDentroDeFecha] = useState(false)
    const [subeNotas, setSubeNotas] = useState(false)

    const { traerComisionesDeDocente, traerAlumnosYNotas, actualizarNotas } = useDocentePresenter()


    useEffect(() => {
        setLoading(true)
        traerComisionesDeDocente(user.idUsuario)
            .then((res) => {
                setLoading(false)
                setComisiones(res ?? [])
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        if (comisionSeleccionada.idComision !== 0) {
            setLoading(true)
            traerAlumnosYNotas(comisionSeleccionada.idComision, user.idUsuario)
                .then((res) => {
                    setLoading(false)
                    setInscriptos(res ?? [])
                })
                .catch(e => console.log(e))
        }
    }, [comisionSeleccionada])

    useEffect(() => {
        if (comisionSeleccionada.idComision !== 0) {
            const hoy = new Date();
            const fechaLimite = new Date(comisionSeleccionada.fechaFin);
            // logica para ver si se edita o no la cosa dentroDeFecha
            console.log("fecha Limite " + fechaLimite)
            setDentroDeFecha(hoy >= fechaLimite)
        }
    }, [comisionSeleccionada])

    const generarNotasComision = () => {
        let notasAEnviar = []
        let notasActuales = subeNotas ? inscriptosConSubida : inscriptos
        notasActuales.forEach((obj) => {
            comisionSeleccionada.tipoInstancia === 1 ?
                notasAEnviar.push(
                    {
                        "idComision": comisionSeleccionada.idComision,
                        "idEstudiante": obj.idEstudiante,
                        "idTipoNota": 1,
                        "nota": obj.primerParcial,
                        "fecha": getCurrentDate('-')
                    },
                    {
                        "idComision": comisionSeleccionada.idComision,
                        "idEstudiante": obj.idEstudiante,
                        "idTipoNota": 2,
                        "nota": obj.segundoParcial,
                        "fecha": getCurrentDate('-')
                    }
                )
                :
                notasAEnviar.push(
                    {
                        "idComision": comisiones.idComision,
                        "idEstudiante": notasActuales.idEstudiante,
                        "idTipoNota": 11,
                        "nota": obj.notaFinal,
                        "fecha": getCurrentDate('-')
                    }
                )
        })
        return notasAEnviar
    }

    const guardarNotas = () => {
        setLoading(true)
        const notas = generarNotasComision()
        actualizarNotas(notas)
            .then((res) => {
                if (res)
                    window.alert("Notas guardadas")
                setLoading(false)

            })
            .catch((e) => {
                setLoading(false)
                console.log(e)
            })
    }

    const actualizarNotaEnTabla = (params) => {
        let notasActuales = subeNotas ? [...inscriptosConSubida] : [...inscriptos];
        const indiceFila = notasActuales.findIndex((nota) => nota.dni === params.id);

        notasActuales[indiceFila] = {
            ...notasActuales[indiceFila],
            [params.field]: params.value,
        };

        subeNotas ? setInscriptosConSubida(notasActuales) : setInscriptos(notasActuales)
    }

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

                //actualizando valores
                let inscriptosSinSubida = inscriptos
                json.forEach((obj) => {
                    inscriptosSinSubida = inscriptosSinSubida.map(
                        el => el.dni == obj['DNI'] ? { ...el, segundoParcial: obj['Parcial 2'], primerParcial: obj['Parcial 1'] } : el
                    )
                    setInscriptosConSubida(inscriptosSinSubida)
                })
            }
            reader.readAsArrayBuffer(e.target.files[0]);
            setSubeNotas(true)
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
                        {comisionSeleccionada.tipoInstancia === 1 ?
                            !subeNotas ?
                                <TablaCursada inscriptos={inscriptos} actualizarNotaEnTabla={actualizarNotaEnTabla}></TablaCursada>
                                :
                                <TablaCursada inscriptos={inscriptosConSubida} actualizarNotaEnTabla={actualizarNotaEnTabla}></TablaCursada>

                            : !subeNotas ?
                                <TablaFinal inscriptos={inscriptos} actualizarNotaEnTabla={actualizarNotaEnTabla}></TablaFinal>
                                :
                                <TablaFinal inscriptos={inscriptosConSubida} actualizarNotaEnTabla={actualizarNotaEnTabla} ></TablaFinal>
                        }
                        <Box mx={3}>
                            <Grid container spacing={1} xs={4} justifyContent="flex-start" alignItems="flex-start" >
                                <Grid item xs={12}>
                                    <label htmlFor="upload-photo">
                                        <input
                                            style={{ display: 'none' }}
                                            id="upload-photo"
                                            name="upload-photo"
                                            type="file"
                                            onChange={subirArchivo}
                                        />
                                        <Button disabled={dentroDeFecha} variant="contained" component="span">
                                            Subir Notas
                                        </Button>
                                    </label>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" component="span">
                                        <a style={{ 'text-decoration': 'none', "color":"white" }} target="_blank" href={`https://gestion-academica-middleware.herokuapp.com/reportes/?operacion=traerEstudiantesInscriptosPorMateria&idComision=${comisionSeleccionada.idComision}`}>
                                            Descargar Planilla
                                        </a>
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button disabled={dentroDeFecha} variant="contained" onClick={() => { guardarNotas() }} component="span">
                                        Guardar Cambios
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