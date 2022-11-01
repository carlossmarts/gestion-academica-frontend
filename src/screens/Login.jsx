import React, { useState, useContext, useEffect } from 'react'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router'
import { useUsuarioPresenter } from '../hooks/UsuarioPresenter'
import { UserContext } from "../context/UserContext";
import Loader from '../components/commons/Loader'
import ModalCambioPass from '../components/commons/ModalCambioPass';

const Login = () => {

    const { user, setUser } = useContext(UserContext)

    const { traerIdUsuario } = useUsuarioPresenter()

    const history = useNavigate();

    const [visible, setVisible] = useState(false);

    const [username, setUsername] = useState("");
    const [errUserName, setErrUserName] = useState("");

    const [password, setPassword] = useState("");
    const [errPass, setErrPass] = useState("");

    const [errorLogin, setErrorLogin] = useState("");

    const [loading, setLoading] = useState(false);

    const [modalCambioPass, setModalCambioPass] = useState(false)

    const [userEdit, setUserEdit] = useState({ username: "", clave: "" })

    const call_setUsername = (val) => {
        if (val === "") {
            setErrUserName("este campo no puede estar vacio")
        } else {
            setErrUserName("")
        }
        setUsername(val)
    }

    const call_setPassword = (val) => {
        if (val === "") {
            setErrPass("este campo no puede estar vacio")
        } else {
            setErrPass("")
        }
        setPassword(val)
    }


    const limpiarCampos = () => {
        setUsername("");
        setPassword("");
        setErrUserName("");
        setErrPass("");
        setVisible(false);
    }

    const irAHome = () => {
        limpiarCampos()
        history("/")
    }

    const validarYEnviar = async () => {
        const formOK = validarCampos();
        if (formOK) {
            setLoading(true)
            try {
                const resUser = await traerIdUsuario(username, password);
                const idUsuario = resUser.idUsuario;
                if (resUser) {
                    setUser(resUser)
                    if (resUser.forzarClave) {
                        setModalCambioPass(true)
                        setUserEdit(resUser)
                    } else {
                        resUser.idTipoUsuario === 3 ?
                            history({ pathname: "/" }) :
                            resUser.idTipoUsuario === 2 ?
                                history({ pathname: "/materiasasignadas" }) : history({ pathname: "/inscripciones" })
                    }
                } else {
                    setErrorLogin("error, verifique usuario y contraseña")
                }
            } catch (error) {
                console.log(error)
                setErrorLogin("error, verifique usuario y contraseña")
            } finally {
                setLoading(false)
            }
        }
    }

    const validarCampos = () => {
        let retorno = true;
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
    const onPressEnter = (e)=>{
        if(e.charCode === 13)
            validarYEnviar()
    }

    return (
        <Container maxWidth="sm" >
            <ModalCambioPass
                open={modalCambioPass}
                setOpen={setModalCambioPass}
                user={userEdit}
                setLoading={setLoading}
                irAHome={irAHome}
            />
            <Box display="flex" justifyContent="center" m={8} onKeyPress={onPressEnter}>
                <Paper>
                    <Grid container spacing={2}>
                        <Grid container item justifyContent="center" >
                            <Box m={3}>
                                <Typography variant="h5" color="initial"> Iniciar sesi&oacute;n</Typography>
                            </Box>
                        </Grid>
                        <Grid container item >
                            <TextField
                                style={{ margin: 8, width: "95%" }}
                                id="userName"
                                label="Nombre de usuario"
                                variant="outlined"
                                value={username}
                                onChange={e => { call_setUsername(e.target.value) }}
                                error={errUserName !== "" ? true : false}
                                helperText={errUserName}

                            />
                        </Grid>
                        <Grid container item >
                            <TextField
                                style={{ margin: 8, width: "95%" }}
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
                        <Grid container item justifyContent="center" >
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
                    </Grid>
                    <Box display="flex" justifyContent="center">
                        {
                            errorLogin ?
                                <Alert severity="warning">{errorLogin} </Alert>
                                :
                                <></>
                        }
                    </Box>
                    <Box m={2} display="flex" justifyContent="space-around">
                        <Button onClick={validarYEnviar} variant="contained" color="primary">
                            Aceptar
                        </Button>
                        <Button onClick={irAHome} variant="outlined" color="primary">
                            Cancelar
                        </Button>

                    </Box>
                </Paper >
            </Box>
            {loading ? <Loader /> : null}
        </Container>
    )
}

export default Login