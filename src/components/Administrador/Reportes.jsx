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
            <Grid item xs={12} container alignItems="center">
                <Grid item xs={12} md={1} container justifyContent="flex-start">
                    <Typography style={styles.label}> Estudiante: </Typography>
                </Grid>
                <Grid item xs={8} md={2} container justifyContent="flex-start">
                    <TextField
                        name="estudiante"
                        value={estudiante}
                        onChange={(e)=>{setEstudiante(e.target.value)}}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={3} container justifyContent="flex-start">
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
        <Grid container>
            <Typography style={styles.title}> Descargar listado de estudiantes por cursada</Typography>
            <Grid item xs={12} container alignItems="center">
                <Grid item xs={12} md={1} container justifyContent="flex-start">
                    <Typography style={styles.label}> Materia: </Typography>
                </Grid>
                <Grid item xs={8} md={3} container justifyContent="flex-start">
                    <TextField
                        name="materia"
                        value={materia}
                        onChange={(e)=>{setMateria(e.target.value)}}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} md={1} container justifyContent="flex-start">
                    <Typography style={styles.label}> Cursada: </Typography>
                </Grid>
                <Grid item xs={8} md={2} container justifyContent="flex-start">
                    <TextField
                        name="cursada"
                        value={cursada}
                        onChange={(e)=>{setCursada(e.target.value)}}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={3} container justifyContent="flex-start">
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

    const ExcelIcon = (
        <Icon>
            <img src="logo192.png"/>
        </Icon>
    )

    return (
        <Grid container>
            <Typography style={styles.title}> Descargar listado de estudiantes inscriptos a finales</Typography>
            <Grid item xs={12} container alignItems="center">
                <Grid item xs={12} md={1} container justifyContent="flex-start">
                    <Typography style={styles.label}> Materia: </Typography>
                </Grid>
                <Grid item xs={8} md={2} container justifyContent="flex-start">
                    <TextField
                        name="materia"
                        value={materia}
                        onChange={(e)=>{setMateria(e.target.value)}}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                
                <Grid item xs={1} container spaciong={1} justifyContent="flex-start">
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
            <Grid item xs={12} container alignItems="center">
                <Grid item xs={12} md={1} container justifyContent="flex-start">
                    <Typography style={styles.label}> Llamado: </Typography>
                </Grid>
                <Grid item xs={8} md={2} container justifyContent="flex-start">
                    <TextField
                        name="llamado"
                        value={llamado}
                        onChange={(e)=>{setLlamado(e.target.value)}}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={3} container justifyContent="flex-start">
                    <IconButton onClick={download} disabled={llamado=== ""}>
                        <PictureAsPdfIcon style={styles.pdf}/>
                    </IconButton>
                </Grid>
            </Grid>

        </Grid>
    )
}

