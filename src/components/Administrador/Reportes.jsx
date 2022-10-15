import React, { useContext, useState } from 'react'
import { Grid, Typography, TextField, IconButton, Box, Icon } from '@mui/material'
import {blue, grey, red, green} from '@mui/material/colors'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import excelIcon from'../../assets/excel.png';
import { UserContext } from '../../context/UserContext';
import UsuarioInhabilitado from '../commons/UsuarioInhabilitado'
import {styles} from '../../styles/styles'

const Reportes = () => {

    const {user} = useContext(UserContext)


    return (
        <>
        {
            user.idTipoUsuario === 3 ?
                <>
                    <Analitico/>
                    <Box p={2}/>
                    <EstudiantesXCursada/>
                    <Box p={2}/>
                    <EstudiantesXFinalMateria/>
                    <Box p={2}/>
                    <LlamadoFinales/>
                </>
            :
                <UsuarioInhabilitado tipoUsuario="administrador"/>
        }
        </>
    )
}

export default Reportes


//Subcompomnentes

const Analitico = (props) =>{

    const [estudiante, setEstudiante] = useState("")

    const download = ()=>{
        alert("TODO- descarga analítico PDF")
    }

    return (
        <Grid container>
            <Typography style={styles.title}> Descargar analítico</Typography>
            <Grid item xs={12} container alignItems="center" spacing={2}>
                <Grid item >
                    <TextField
                        label={"Estudiante"}
                        name="estudiante"
                        value={estudiante}
                        onChange={(e)=>{setEstudiante(e.target.value)}}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item >
                    <IconButton onClick={download} disabled={estudiante=== ""}>
                        <PictureAsPdfIcon style={styles.pdf}/>
                    </IconButton>
                </Grid>
            </Grid>

        </Grid>
    )
}

const EstudiantesXCursada = (props)=>{

    const [materia, setMateria] = useState("")
    const [cursada, setCursada] = useState("")

    const download =()=>{
        alert("TODO- descarga listado de estudiantes por cursada XLS")
    }

    return (
        <Grid container >
            <Typography style={styles.title}> Descargar listado de estudiantes por cursada</Typography>
            <Grid item xs={12} container alignItems="center" spacing={2}>
                <Grid item >
                    <TextField
                        label="Materia"
                        name="materia"
                        value={materia}
                        onChange={(e)=>{setMateria(e.target.value)}}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item >
                    <TextField
                        label="cursada"
                        name="cursada"
                        value={cursada}
                        onChange={(e)=>{setCursada(e.target.value)}}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item>
                    <IconButton onClick={download} disabled={materia=== "" || cursada === ""}>
                        <img src={excelIcon}/>
                    </IconButton>
                </Grid>
            </Grid>

        </Grid>
    )
}

const EstudiantesXFinalMateria = (props)=>{

    const [materia, setMateria] = useState("")

    const downloadXLS =()=>{
        alert("TODO- descarga listado de estudiantes inscriptos al algun final de materia XLS")
    }

    const downloadPDF =()=>{
        alert("TODO- descarga listado de estudiantes inscriptos al algun final de materia PDF")
    }

    return (
        <Grid container>
            <Typography style={styles.title}> Descargar listado de estudiantes inscriptos a finales</Typography>
            <Grid item xs={12} container alignItems="center" spacing={2}>
                <Grid item >
                    <TextField
                        label="materia"
                        name="materia"
                        value={materia}
                        onChange={(e)=>{setMateria(e.target.value)}}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                
                <Grid item >
                    <IconButton onClick={downloadXLS} disabled={materia=== "" }>
                       <img src={excelIcon} />
                    </IconButton>
                    <IconButton onClick={downloadPDF} disabled={materia=== "" }>
                        <PictureAsPdfIcon style={styles.pdf}/>
                    </IconButton>
                </Grid>
            </Grid>

        </Grid>
    )
}

const LlamadoFinales = (props) =>{

    const [llamado, setLlamado] = useState("")

    const download = ()=>{
        alert("TODO- descarga planilla de materias del llamado a finales PDF")
    }

    return (
        <Grid container>
            <Typography style={styles.title}> Descargar materias por llamado a finales</Typography>
            <Grid item xs={12} container alignItems="center" spacing={2}>
                <Grid item >
                    <TextField
                        label="Llamado"
                        name="llamado"
                        value={llamado}
                        onChange={(e)=>{setLlamado(e.target.value)}}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item >
                    <IconButton onClick={download} disabled={llamado=== ""}>
                        <PictureAsPdfIcon style={styles.pdf}/>
                    </IconButton>
                </Grid>
            </Grid>

        </Grid>
    )
}

