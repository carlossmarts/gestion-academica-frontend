import React, {useState} from 'react'
import {styles} from "../../styles/styles";
import {Grid, Button, Typography, TextField, MenuItem} from '@mui/material'
import {useAdministracionPresenter} from "../../hooks/AdministracionPresenter";

const GestionInscripciones = () => {

    const {saveInscripcion} = useAdministracionPresenter()

    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [instancia, setInstancia] = useState(0);
    const [descripcion, setDescripcion] = useState("");

    const newError = {
        desde: false,
        hasta: false,
        fechaInicio: false,
        fechaFin: false,
        instancia: false,
        descripcion: false
    }
    const [error, setError] = useState(newError)

    const validar = ()=>{
        let tempError = newError
        let retorno = true
        if(desde === ""){
            retorno = false
            tempError.desde = true
        }
        if(hasta === ""){
            retorno = false
            tempError.hasta = true
        }
        if(fechaInicio === ""){
            retorno = false
            tempError.fechaInicio = true
        }
        if(fechaFin === ""){
            retorno = false
            tempError.fechaFin = true
        }
        if(instancia === 0){
            retorno = false
            tempError.instancia = true
        }
        setError(tempError)
        return retorno
    }

    const guardar = ()=> {

        if(!validar()){
            alert("Falta completar campos obligatorios")
        } else {
            const body={
                instancia: instancia,
                descripcion: descripcion,
                desde: desde,
                hasta: hasta,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin
            }
            saveInscripcion(body)
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography style={styles.title}> Agregar ventana de inscripcion</Typography>
            </Grid>
            <Grid item xs={12} container alignItems="center" spacing={1}>
                <Grid item xs={6} md={3} container justifyContent="flex-start">
                    <TextField
                        fullWidth
                        label="Instancia"
                        name="instancia"
                        select
                        value={instancia}
                        onChange={(e)=>{setInstancia(e.target.value)}}
                        variant="outlined"
                        size="small"
                        error = {error.instancia}
                    >
                        <MenuItem key={0} value={0}>
                            Seleccione...
                        </MenuItem>
                        <MenuItem key={1} value={1}>
                            Cursada
                        </MenuItem>
                        <MenuItem key={2} value={2}>
                            Examen
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={6} md={3} container justifyContent="flex-start">
                    <TextField
                        fullWidth
                        label="Descripción"
                        name="descr"
                        value={descripcion}
                        onChange={(e)=>{setDescripcion(e.target.value)}}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={6} md={3} container justifyContent="flex-start">
                    <TextField
                        fullWidth
                        label="Inscripción Desde"
                        name="desde"
                        type="date"
                        value={desde}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e)=>{setDesde(e.target.value)}}
                        variant="outlined"
                        size="small"
                        error={error.desde}
                        inputProps={{max: hasta}}
                    />
                </Grid>
                <Grid item xs={6} md={3} container justifyContent="flex-start">
                    <TextField
                        fullWidth
                        name="hasta"
                        label="Inscripción Hasta"
                        type="date"
                        size="small"
                        value={hasta}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e)=>setHasta(e.target.value)}
                        hasta={error.hasta}
                        inputProps={{min: desde}}
                    />
                </Grid>
                {
                    instancia === 1 ?
                        <Grid item xs={6} md={3} container justifyContent="flex-start">
                            <TextField
                                fullWidth
                                name="fechaInicio"
                                label="Inicio de cursada"
                                type="date"
                                size="small"
                                value={fechaInicio}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e)=>setFechaInicio(e.target.value)}
                                error={error.fechaInicio}
                                inputProps={{max: fechaFin}}

                            />
                        </Grid>
                    : null
                }

                {
                    instancia === 2 ?
                        <Grid item xs={6} md={3} container justifyContent="flex-start">
                            <TextField
                                fullWidth
                                name="fechaInicio"
                                label="Inicio de llamado"
                                type="date"
                                size="small"
                                value={fechaInicio}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e)=>setFechaInicio(e.target.value)}
                                error={error.fechaInicio}
                                inputProps={{max: fechaFin}}
                            />
                        </Grid>
                    : null
                }
                {
                    instancia !== 0 ?
                        <Grid item xs={6} md={3} container justifyContent="flex-start">
                            <TextField
                                fullWidth
                                name="fechaFin"
                                label="Limite cierre notas"
                                type="date"
                                size="small"
                                value={fechaFin}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e)=>setFechaFin(e.target.value)}
                                error={error.fechaFin}
                                inputProps={{min: fechaInicio}}
                            />
                        </Grid>
                    : null
                }


            </Grid>
            <Grid item xs={12}>
                <Grid item xs={3} container justifyContent="flex-start">
                    <Button onClick={guardar} variant="contained">
                        Agregar
                    </Button>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default GestionInscripciones