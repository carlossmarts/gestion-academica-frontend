import React, { useContext, useState, useEffect } from 'react'
import { Grid, Typography, TextField, IconButton, Box, MenuItem } from '@mui/material'
import {useNavigate} from 'react-router-dom'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import excelIcon from'../../assets/excel.png';
import { UserContext } from '../../context/UserContext';
import UsuarioInhabilitado from '../commons/UsuarioInhabilitado'
import {styles} from '../../styles/styles'
import {useUsuarioPresenter} from "../../hooks/UsuarioPresenter";
import {useAdministracionPresenter} from "../../hooks/AdministracionPresenter";
import ConsultaCursadasOExamenes from "./ConsultaCursadasOExamenes";

const baseUrl = "https://gestion-academica-middleware.herokuapp.com/reportes/"

const Reportes = () => {

    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <>
        {
            user.idTipoUsuario === 3 ?
                <>
                    <Analitico/>
                    <Box p={2}/>
                    <EstudiantesXCursadaOFinal idInstancia={1}/>
                    <Box p={2}/>
                    <EstudiantesXCursadaOFinal idInstancia={2}/>
                    <Box p={2}/>
                    <ConsultaCursadasOExamenes idInstancia={1}/>
                    <Box p={2}/>
                    <ConsultaCursadasOExamenes idInstancia={2}/>
                </>
            :
                <UsuarioInhabilitado tipoUsuario="administrador"/>
        }
        </>
    )
}

export default Reportes


//Subcomponentes

const Analitico = (props) =>{

    const {getEstudiantes, defaultUsuario} = useUsuarioPresenter()
    const [estudiantes, setEstudiantes] = useState([defaultUsuario]);
    const [estudiante, setEstudiante] = useState(0)
    const {navigate} = props

    useEffect(()=>{
        getEstudiantes().then(res=>setEstudiantes(res)).catch(e=>console.log(e))
    },[])

    return (
        <Grid container>
            <Typography style={styles.title}> Descargar analítico</Typography>
            <Grid item xs={12} container alignItems="center" spacing={2}>
                <Grid item >
                    {
                        estudiantes ?
                            <TextField
                                fullWidth
                                label={"Estudiante"}
                                name="estudiante"
                                value={estudiante}
                                onChange={(e)=>{setEstudiante(e.target.value)}}
                                variant="outlined"
                                size="small"
                                select
                            >
                                {
                                    estudiantes.map((option) => (
                                        <MenuItem key={option.idUsuario} value={option.idUsuario}>
                                            {`${option.apellido} ${option.nombre}`}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        : null
                    }
                </Grid>
                <Grid item >
                        <IconButton onClick={()=>{}} disabled={estudiante=== 0}>
                            <a
                                href={`${baseUrl}?operacion=traerMateriasAprobadasPorEstudiante&idUsuario=${estudiante}"`}
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

const EstudiantesXCursadaOFinal = (props)=>{

    const {
        idInstancia //1: cursada, 2:examen final
    } = props
    const {
        getCarreras,
        defaultCarrera,
        getMateriasByCarrera,
        defaultMateria,
        getComisionesPorInstanciaYMateria,
        defaultComision
    } = useAdministracionPresenter()

    const [carreras, setCarreras] = useState([defaultCarrera]);
    const [materias, setMaterias] = useState([defaultMateria]);
    const [comisiones, setComisiones] = useState([defaultComision]);

    const [carrera, setCarrera] = useState(0);
    const [materia, setMateria] = useState(0)
    const [comision, setComision] = useState(0)


    useEffect(()=>{
        getCarreras()
            .then( res => setCarreras(res))
            .catch(e=>console.log(e))
    }, [])

    useEffect(()=>{
        if(carrera === 0){
            setMateria(0)
            setComision(0)
            setMaterias([{ idMateria:0, nombre:"seleccione..."}])
        }else{
            getMateriasByCarrera(carrera)
                .then( res => setMaterias(res))
                .catch(e=>console.log(e))
        }
    }, [carrera])

    useEffect(()=>{
        if(materia!== 0 ){
            getComisionesPorInstanciaYMateria(idInstancia,materia)
                .then(data => setComisiones(data))
                .catch(e => console.log(e))
        } else{
            setComision(0)
            setComisiones([defaultComision])
        }
    }, [materia])


    return (
        <Grid container >
            <Typography style={styles.title}> {`Descargar listado de estudiantes por ${idInstancia === 1 ? "cursada" : "examen final"}`}</Typography>
            <Grid item xs={12} container alignItems="center" spacing={2}>
                <Grid item>
                    {
                        carreras ?
                            <TextField
                                fullWidth
                                name="idCarrera"
                                select
                                size="small"
                                label="Carrera"
                                value={carrera}
                                onChange={(e)=>{setCarrera(e.target.value)}}
                            >
                                {
                                    carreras.map((option) => (
                                        <MenuItem key={option.idCarrera} value={option.idCarrera}>
                                            {option.nombre}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        : null
                    }
                </Grid>
                <Grid item >
                    {
                        materias ?
                            <TextField
                                fullWidth
                                select
                                size="small"
                                label="Materia"
                                value={materia}
                                disabled={carrera === 0}
                                onChange={(e)=>{setMateria(e.target.value)}}
                            >
                                {
                                    materias.map((option) => (
                                    <MenuItem key={option.idMateria} value={option.idMateria}>
                                        {option.nombre}
                                    </MenuItem>
                                    ))
                                }
                            </TextField>
                        : null
                    }
                </Grid>
                <Grid item >
                    {
                        comisiones ?
                            <TextField
                                fullWidth
                                select
                                size="small"
                                label="Comisión"
                                value={comision}
                                disabled={carrera === 0}
                                onChange={(e)=>{setComision(e.target.value)}}
                            >
                                {
                                    comisiones.map((option) => (
                                        <MenuItem key={option.idComision} value={option.idComision}>
                                            {option.comision}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        : null
                    }

                </Grid>
                <Grid item>
                    <IconButton onClick={()=>{}} disabled={comision === 0}>
                        <a
                            href={`https://gestion-academica-middleware.herokuapp.com/reportes/?operacion=traerEstudiantesInscriptosPorMateria&idComision=${comision}`}
                        >
                            <img src={excelIcon}/>
                        </a>
                    </IconButton>
                </Grid>
            </Grid>

        </Grid>
    )
}

