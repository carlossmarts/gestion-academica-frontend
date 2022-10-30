import React, {useState, useEffect, useContext} from 'react'
import {Grid, IconButton, Typography, TextField, MenuItem} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import {styles} from '../../styles/styles'

import {useAdministracionPresenter} from "../../hooks/AdministracionPresenter";
import {UtilsContext} from "../../context/UtilsContext";

const ConsultaCursadasOExamenes = (props) =>{

    const {
        idInstancia //1: cursada || 2:Llamado a finales
    } = props

    const {
        getInscripciones, defaultInscripcion,
    } = useAdministracionPresenter()


    const [inscripciones, setInscripciones] = useState([defaultInscripcion]);
    const {carreras, turnos} = useContext(UtilsContext)
    const [carrera, setCarrera] = useState(0);
    const [inscripcion, setInscripcion] = useState(0);
    const [turno, setTurno] = useState(0);

    const reporteUrl = "https://gestion-academica-middleware.herokuapp.com/reportes/?operacion=traerMateriasPorInscripcionYCarreraYTurno"

    useEffect(()=>{
        getInscripciones(idInstancia)
            .then(data => setInscripciones(data))
            .catch(e=>console.log(e))
    },[])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography style={styles.title}>
                    {
                        idInstancia === 1 ?
                            "Descargar cursadas por cuatrimestre"
                        :
                            "Descargar materias por llamado a finales"
                    }
                </Typography>
            </Grid>
            <Grid item xs={12} container alignItems="center" spacing={1}>
                <Grid item >
                    {
                        carreras ?
                            <TextField
                                label="Carrera"
                                value={carrera}
                                fullWidth
                                onChange={(e)=>{setCarrera(e.target.value)}}
                                variant="outlined"
                                size="small"
                                select
                            >
                                {carreras.map((option) => (
                                    <MenuItem key={option.idCarrera} value={option.idCarrera}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                            </TextField>
                            : null
                    }
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        name="inscripcion"
                        label={idInstancia === 1 ? "Cuatrimestre" : "Llamado"}
                        select
                        size="small"
                        value={inscripcion}
                        onChange={(e)=>setInscripcion(e.target.value)}
                    >
                        {
                            inscripciones.map(option =>(
                                <MenuItem key={option.idInscripcion} value={option.idInscripcion}>
                                    {option.descripcion}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </Grid>
                <Grid item>
                    {
                        turnos ?
                            <TextField
                                fullWidth
                                label="Turno"
                                select
                                size="small"
                                value={turno}
                                onChange={(e)=>setTurno(e.target.value)}
                            >
                                {
                                    turnos.map(option =>(
                                        <MenuItem key={option.idTurno} value={option.idTurno}>
                                            {option.nombre}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                            : null
                    }
                </Grid>
                <Grid item xs={3} container justifyContent="flex-start">
                    <IconButton onClick={()=>{}} disabled={carrera === 0 || inscripcion === 0 || turno === 0}>
                        <a
                            href={`${reporteUrl}&idInscripcion=${inscripcion}&idCarrera=${carrera}&idTurno=${turno}`}
                            target="_blank"
                        >
                            <PictureAsPdfIcon style={styles.pdf}/>
                        </a>
                    </IconButton>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default ConsultaCursadasOExamenes