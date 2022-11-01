import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Box, IconButton, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useUsuarioPresenter } from '../../hooks/UsuarioPresenter'
const ModalCambioPass = (props) => {

    const {
        open,
        setOpen,
        user,
        setLoading,
        irAHome
    } = props

    const { modificarUsuario } = useUsuarioPresenter()

    const [form, setForm] = useState(user)
    const [errorUsername, setErrorUsername] = useState("")
    const [errorClave, setErrorClave] = useState("")
    const [visible, setVisible] = useState(false);

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        const tempForm = { ...form }
        tempForm[name] = value
        setForm(tempForm)
    }

    const close = () => {
        setOpen(false)
        irAHome()
    }

    const validarCampos = () => {
        let retorno = true;
        if (form.username === "") {
            setErrorUsername("Este campo es requerido")
            retorno = false;
        }
        if (form.clave === "") {
            setErrorClave("Este campo es requerido")
            retorno = false;
        }

        return retorno;
    }

    const validarYEnviar = async () => {
        const formOK = validarCampos();
        if (formOK) {
            setLoading(true)
            try {
                const resUser = await modificarUsuario({ ...form, forzarClave: false }) //modificar por update
                setOpen(false)
                alert(`Usuario modificado con exito \n username: ${resUser.username} - contraseña: ${resUser.clave}`)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        irAHome()
    }

    useEffect(() => {
        setForm(user)
    }, [user])

    return (
        <>
            <Dialog open={open} onClose={close} maxWidth="xs">
                <Box m={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" >
                                Modificar usuario
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="username"
                                fullWidth
                                InputProps={{ readOnly: true }}
                                label="Nombre de usuario"
                                value={form.username}
                                onChange={handleChange}
                                size="small"
                                error={errorUsername !== ""}
                                helperText={errorUsername}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="clave"
                                type={visible ? "text" : "password"}
                                label="Contraseña"
                                value={form.clave}
                                onChange={handleChange}
                                size="small"
                                error={errorClave !== ""}
                                helperText={errorClave}
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
                        <Grid item container justifyContent="center" >
                            <Button onClick={validarYEnviar} color="primary" variant="contained">
                                Aceptar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </>
    )
}

export default ModalCambioPass