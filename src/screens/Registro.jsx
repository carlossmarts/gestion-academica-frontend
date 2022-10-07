import React, { useState, useContext } from 'react'
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router'
import { useUsuarioPresenter } from '../hooks/UsuarioPresenter'
import {
    Grid,
    Typography,
    IconButton,
    Box,
    Container,
    Paper,
    TextField,
} from '@mui/material'
import {UserContext} from "../context/UserContext";



const Registro = () => {

    const history = useNavigate();
    const { altaUsuario } = useUsuarioPresenter()

    const {user, setUser} = useContext(UserContext)

    const [cargando, setCargando] = useState(true);
    const [visible, setVisible] = useState(false);

    const [nombre, setNombre] = useState("");
    const [errNombre, setErrNombre] = useState("");

    const [apellido, setApellido] = useState("");
    const [errApellido, setErrApellido] = useState("");

    const [dni, setDni] = useState("");
    const [errDni, setErrDni] = useState("");

    const [email, setEmail] = useState("");
    const [errEmail, setErrEmail] = useState("");

    const [username, setUsername] = useState("");
    const [errUserName, setErrUserName] = useState("");

    const [password, setPassword] = useState("");
    const [errPass, setErrPass] = useState("");

    const [alertMsg, setAlertMsg] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("")


    const call_setUsername = (val) => {
        if (val === "") {
            setErrUserName("Este campo no puede estar vacio")
        } else {
            setErrUserName("")
        }
        setUsername(val)
    }

    const call_setPassword = (val) => {
        if (val === "") {
            setErrPass("Este campo no puede estar vacio")
        } else {
            setErrPass("")
        }
        setPassword(val)
    }

    const call_setNombre = (val) => {
        if (val === "") {
            setErrNombre("Este campo no puede estar vacio")
        } else {
            setErrNombre("")
        }
        setNombre(val)
    }

    const call_setApellido = (val) => {
        if (val === "") {
            setErrApellido("Este campo no puede estar vacio")
        } else {
            setErrApellido("")
        }
        setApellido(val)
    }

    const call_setDni = (val) => {
        if (val === "") {
            setErrDni("Este campo no puede estar vacio")
        } else {
            setErrDni("")
        }
        setDni(val)
    }

    const call_setEmail = (val) => {
        if (val !== "") {
            setErrEmail("");
            setEmail(val);
        } else {
            setErrEmail("Este campo no puede estar vacio");
            setEmail(val);
        }
    }

    const limpiarCampos = () => {
        setNombre("");
        setApellido("");
        setDni("");
        setEmail("");
        setUsername("");
        setPassword("");

        setErrNombre("");
        setErrApellido("");
        setErrDni("");
        setErrEmail("");
        setErrUserName("");
        setErrPass("");

        setVisible(false);

    }

    const validarCampos = () => {
        let retorno = true;
        if (nombre === "") {
            setErrNombre("Este campo es requerido");
            retorno = false;
        }
        if (apellido === "") {
            setErrApellido("Este campo es requerido");
            retorno = false;
        }
        if (dni === "") {
            setErrDni("Este campo es requerido");
            retorno = false;
        }
        if (email === "") {
            setErrEmail("Este campo es requerido");
            retorno = false;
        }
        if (username === "") {
            setErrUserName("Este campo es requerido");
            retorno = false;
        }
        if (password === "") {
            setErrPass("Este campo es requerido");
            retorno = false;
        }

        return retorno;
    }

    const validarYEnviar = async () => {
        const formOK = validarCampos();
        if (formOK) {
            try {
                const nuevoUsuario = {
                    "idUsuario": 0,
                    "nombre": nombre,
                    "apellido": apellido,
                    "dni": dni,
                    "email": email.toString(),
                    "usuario": username,
                    "clave": password,
                }
                const resUser = await altaUsuario(nuevoUsuario)
                setUser(resUser)
                alert("Usuario Creado")
                history({
                    pathName:"/",
                    state: resUser.idUsuario
                })
            } catch (error) {
                console.log(error)
                setAlertSeverity("error")
                setAlertMsg("Error, intente nuevamente")
            }

        }
    }
    const irAHome = () => {
        limpiarCampos()
        history("/")
    }

    return (
        <>
            <Box m={8} />
            <Container maxWidth="sm" >
                <Paper>
                    <Box m={4}>
                        <Grid container spacing={2}>
                            <Grid container item justifyContent="center" >
                                <Box m={3}>
                                    <Typography variant="h5" color="initial"> Registrarme</Typography>
                                </Box>
                            </Grid>
                            <Grid item container>
                                <TextField
                                    fullWidth
                                    id="userName"
                                    label="Usuario"
                                    variant="outlined"
                                    value={username}
                                    onChange={e => { call_setUsername(e.target.value) }}
                                    error={errUserName !== "" ? true : false}
                                    helperText={errUserName}
                                />
                            </Grid>
                            <Grid item container>
                                <TextField
                                    fullWidth
                                    id="password"
                                    label="contraseña"
                                    variant="outlined"
                                    type={visible ? "text" : "password"}
                                    value={password}
                                    onChange={e => { call_setPassword(e.target.value) }}
                                    error={errPass !== "" ? true : false}
                                    helperText={errPass}

                                />

                            </Grid>

                            <Grid item container justifyContent="center" >

                                <IconButton onClick={() => { setVisible(!visible) }}>
                                    {
                                        visible
                                            ?
                                            <VisibilityIcon />
                                            :
                                            <VisibilityOffIcon />
                                    }
                                </IconButton>
                            </Grid>
                            <hr style={{ width: "100%" }} />
                            <Grid container item>
                                <TextField
                                    fullWidth
                                    id="nombre"
                                    label="Nombre"
                                    variant="outlined"
                                    value={nombre}
                                    onChange={e => { call_setNombre(e.target.value) }}
                                    error={errNombre !== "" ? true : false}
                                    helperText={errNombre}
                                />
                            </Grid>
                            <Grid container item>
                                <TextField
                                    fullWidth
                                    id="apellido"
                                    label="Apellido"
                                    variant="outlined"
                                    value={apellido}
                                    onChange={e => { call_setApellido(e.target.value) }}
                                    error={errApellido !== "" ? true : false}
                                    helperText={errNombre}
                                />
                            </Grid>
                            <Grid container item>
                                <TextField
                                    fullWidth
                                    id="dni"
                                    label="DNI"
                                    variant="outlined"
                                    value={dni}
                                    onChange={e => { call_setDni(e.target.value) }}
                                    error={errDni !== "" ? true : false}
                                    helperText={errDni}
                                />
                            </Grid>
                            <Grid container item>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={e => { call_setEmail(e.target.value) }}
                                    error={errEmail !== "" ? true : false}
                                    helperText={errEmail}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        {
                            alertMsg ?
                                <Alert severity={alertSeverity}>{alertMsg} </Alert>
                                :
                                <></>
                        }
                    </Box>
                    <Box m={2} display="flex" justifyContent="space-around" alignItems="center">
                        <Button onClick={validarYEnviar} variant="contained" color="secondary">
                            Aceptar
                        </Button>
                        <Button onClick={irAHome} variant="outlined" color="secondary">
                            Cancelar
                        </Button>
                    </Box>
                </Paper >
            </Container>
        </>
    )
}

export default Registro