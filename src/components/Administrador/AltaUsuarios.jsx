import React, { useState, useContext, useEffect } from 'react'

import Alert from '@mui/material/Alert';
import { Grid, Typography, Box, TextField, Button, Container, MenuItem} from '@mui/material'
import {styles} from "../../styles/styles";

import { useNavigate } from 'react-router'
import {UserContext} from "../../context/UserContext";

import {useUsuarioPresenter} from '../../hooks/UsuarioPresenter'
import {useAdministracionPresenter} from '../../hooks/AdministracionPresenter'

import Loader from '../commons/Loader'



const AltaUsuarios = () => {

    const history = useNavigate();
    const {getCarreras, defaultCarrera} = useAdministracionPresenter()
    const { altaUsuario } = useUsuarioPresenter()

    const {user, setUser} = useContext(UserContext)

    const newForm = {
        nombre: "",
        apellido: "",
        dni:"",
        correo:"",
        celular:"",
        idTipoUsuario:0,
        idCarrera: 0
    }

    const [form, setForm] = useState(newForm)
    const [error, setError] = useState(newForm)
    const [loading, setLoading] = useState(false)
    const [alertMsg, setAlertMsg] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("")

    const [carreras, setCarreras] = useState([defaultCarrera])

    useEffect(()=>{
        getCarreras()
            .then( res => setCarreras(res))
            .catch(e=>console.log(e))
    }, [])

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value

        let tempError = {...error}
        let tempForm = {...form}
        tempForm[name] = value
        if (value === "" || value === 0) {
            tempError[name] = "este campo no puede estar vacio"
        } else {
            tempError[name] = ""
        }
        setError(tempError)
        setForm(tempForm)
    }

    const limpiarCampos = () => {
        setForm(newForm)
        setError(newForm)
    }

    const validarCampos = () => {
        let retorno = true;
        let tempError = error
        if (form.nombre === "") {
            tempError = {...tempError, nombre: "Este campo es requerido"}
            retorno = false;
        }
        if (form.apellido === "") {
            tempError = {...tempError, apellido: "Este campo es requerido"}
            retorno = false;
        }
        if (form.dni === "") {
            tempError = {...tempError, dni: "Este campo es requerido"}
            retorno = false;
        }
        if (form.correo === "") {
            tempError = {...tempError, correo: "Este campo es requerido"}
            retorno = false;
        }
        if (form.idTipoUsuario === 0) {
            tempError = {...tempError, idTipoUsuario: "Debe seleccionar un tipo de usuario"}
            retorno = false;
        }
        if (form.idCarrera === 0) {
            tempError = {...tempError, idCarrera: "Debe seleccionar una carrera"}
            retorno = false;
        }
        setError(tempError)

        return retorno;
    }

    const validarYEnviar = async () => {
        const formOK = validarCampos();
        if (formOK) {
            setLoading(true)
            try {
                const resUser = await altaUsuario(form)
                alert(`Usuario creado con exito \n username: ${resUser.value.username} - contraseña: ${resUser.value.clave}`)
                limpiarCampos()
            } catch (error) {
                console.log(error)
                setAlertSeverity("error")
                setAlertMsg("Error, intente nuevamente")
            } finally{
                setLoading(false)
            }
        }
    }


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                        <Typography style={styles.title}> Nuevo usuario</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        name="nombre"
                        label="Nombre"
                        variant="outlined"
                        value={form.nombre}
                        onChange={handleChange}
                        error={error.nombre !== "" ? true : false}
                        helperText={error.nombre}
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        name="apellido"
                        label="Apellido"
                        variant="outlined"
                        value={form.apellido}
                        onChange={handleChange}
                        error={error.apellido !== "" ? true : false}
                        helperText={error.apellido}
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        name="dni"
                        label="DNI"
                        variant="outlined"
                        value={form.dni}
                        onChange={handleChange}
                        error={error.dni !== "" ? true : false}
                        helperText={error.dni}
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        name="correo"
                        label="Email"
                        variant="outlined"
                        value={form.correo}
                        onChange={handleChange}
                        error={error.correo !== "" ? true : false}
                        helperText={error.correo}
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    {
                        carreras ?
                            <TextField
                                fullWidth
                                size="small"
                                name="idCarrera"
                                select
                                label="Carrera"
                                value={form.idCarrera}
                                onChange={handleChange}
                                error={error.idCarrera !== 0 && error.idCarrera !== "" ? true : false}
                                helperText={error.idCarrera !== 0 ? error.idCarrera : ""}
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
                <Grid item xs={6} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        name="idTipoUsuario"
                        select
                        label="Tipo de usuario"
                        value={form.idTipoUsuario}
                        onChange={handleChange}
                        error={error.idTipoUsuario !== 0 && error.idTipoUsuario !== "" ? true : false}
                        helperText={error.idTipoUsuario !== 0 ? error.idTipoUsuario : ""}
                    >
                        <MenuItem key={0} value={0}>
                            Seleccione...
                        </MenuItem>
                        <MenuItem key={1} value={1}>
                            Estudiante
                        </MenuItem>
                        <MenuItem key={2} value={2}>
                            Docente
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={validarYEnviar} variant="contained" color="primary">
                        Aceptar
                    </Button>
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="center">
                {
                    alertMsg ?
                        <Alert severity={alertSeverity}>{alertMsg} </Alert>
                        :
                        <></>
                }
            </Box>
            {
                loading ? <Loader/> : null
            }
        </>
    )
}

export default AltaUsuarios