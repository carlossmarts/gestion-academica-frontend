import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import { Grid, Typography, Box, TextField, Button, IconButton, InputAdornment, Icon } from '@mui/material'
import { styles } from "../../styles/styles";
import { UserContext } from "../../context/UserContext";
import { useUsuarioPresenter } from '../../hooks/UsuarioPresenter'
import Loader from '../commons/Loader'


const EdicionPerfil = () => {

  const { modificarUsuario, traerUsuarioPorId } = useUsuarioPresenter()
  const idUsuarioAEditar = useParams();

  const { user, setUser } = useContext(UserContext)

  const newForm = {
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
    celular: "",
    idTipoUsuario: 0,
    idCarrera: 0
  }

  const [visible, setVisible] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [estudiante, setEstudiante] = useState(newForm)
  const [error, setError] = useState(newForm)
  const [loading, setLoading] = useState(false)
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("")


  useEffect(() => {
    user.idTipoUsuario !== 3 ?
      setBloqueado(true)
      :
      setBloqueado(false)

    idUsuarioAEditar.id == user.idUsuario ?
      setEstudiante(user)
      :
      setEstudiante(traerUsuarioPorId(idUsuarioAEditar.id))
  }, [])


  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    let tempError = { ...error }
    let tempForm = { ...estudiante }
    tempForm[name] = value
    if (value === "" || value === 0) {
      tempError[name] = "este campo no puede estar vacio"
    } else {
      tempError[name] = ""
    }
    setError(tempError)
    setEstudiante(tempForm)
  }

  const validarCampos = () => {
    let retorno = true;
    let tempError = error
    if (estudiante.nombre === "") {
      tempError = { ...tempError, nombre: "Este campo es requerido" }
      retorno = false;
    }
    if (estudiante.apellido === "") {
      tempError = { ...tempError, apellido: "Este campo es requerido" }
      retorno = false;
    }
    if (estudiante.dni === "") {
      tempError = { ...tempError, dni: "Este campo es requerido" }
      retorno = false;
    }
    if (estudiante.correo === "") {
      tempError = { ...tempError, correo: "Este campo es requerido" }
      retorno = false;
    }
    if (estudiante.celular === 0) {
      tempError = { ...tempError, celular: "Este campo es requerido" }
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
        const resUser = await modificarUsuario(estudiante)
        if (idUsuarioAEditar.id == user.idUsuario) setUser(resUser)
        alert(`Usuario actualizado con exito`)
      } catch (error) {
        console.log(error)
        setAlertSeverity("error")
        setAlertMsg("Error, intente nuevamente")
      } finally {
        setLoading(false)
      }
    }
  }


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography style={styles.title}> Actualizar Usuario </Typography>
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            disabled={bloqueado}
            fullWidth
            size="small"
            name="nombre"
            label="Nombre"
            variant="outlined"
            value={estudiante.nombre}
            onChange={handleChange}
            error={error.nombre !== "" ? true : false}
            helperText={error.nombre}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
          disabled={bloqueado}
            fullWidth
            size="small"
            name="apellido"
            label="Apellido"
            variant="outlined"
            value={estudiante.apellido}
            onChange={handleChange}
            error={error.apellido !== "" ? true : false}
            helperText={error.apellido}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
          disabled={bloqueado}
            fullWidth
            size="small"
            name="dni"
            label="DNI"
            variant="outlined"
            value={estudiante.dni}
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
            value={estudiante.correo}
            onChange={handleChange}
            error={error.correo !== "" ? true : false}
            helperText={error.correo}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            fullWidth
            size="small"
            name="celular"
            label="Celular"
            variant="outlined"
            value={estudiante.celular}
            onChange={handleChange}
            error={error.celular !== "" ? true : false}
            helperText={error.celular}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
          disabled={bloqueado}
            fullWidth
            size="small"
            name="username"
            label="Usuario"
            variant="outlined"
            value={estudiante.username}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            fullWidth
            size="small"
            name="clave"
            label="Contraseña"
            variant="outlined"
            type={visible ? "text" : "password"}
            value={estudiante.clave}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => { setVisible(!visible) }}>
                  {
                    visible
                      ?
                      <VisibilityIcon />
                      :
                      <VisibilityOffIcon />
                  }
                </IconButton>
              )
            }}
          />
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
        loading ? <Loader /> : null
      }
    </>
  )

}

export default EdicionPerfil