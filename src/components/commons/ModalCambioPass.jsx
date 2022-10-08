import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Box } from '@mui/material'
import { useUsuarioPresenter } from '../../hooks/UsuarioPresenter'

const ModalCambioPass = (props) => {

    const {
        open,
        setOpen,
        user,
        setLoading
    } = props

    const {modificarUsuario} = useUsuarioPresenter()

    const [form, setForm] = useState(user)
    const [errorUsername, setErrorUsername] = useState("")
    const [errorClave, setErrorClave] = useState("")

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        const tempForm = {...form}
        tempForm[name] = value
        setForm(tempForm)
    }

    const close = ()=>{
        setOpen(false)
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
                const resUser = await modificarUsuario(form) //modificar por update
                setOpen(false)
                alert(`Usuario modificado con exito \n username: ${resUser.username} - contraseña: ${resUser.clave}`)
            } catch (error) {
                console.log(error)
            } finally{
                setLoading(false)
            }
        }
    }

    useEffect(()=>{
        setForm(user)
    }, [user])

  return (
    <>
        <Dialog open={open} onClose={close} maxWidth="xs">
            <DialogTitle>
                Modificar usuario
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <TextField
                        name="username"
                        fullWidth
                        label="Nombre de usuario"
                        value={form.username}
                        onChange={handleChange}
                        size="small"
                        error={errorUsername!== ""}
                        helperText={errorUsername}
                        />
                    <Box p={1}/>
                    <TextField
                        fullWidth
                        name="clave"
                        label="Nombre de usuario"
                        value={form.clave}
                        onChange={handleChange}
                        size="small"
                        error={errorClave !== ""}
                        helperText={errorClave}
                    />
                </Grid>
                    
            </DialogContent>
            <DialogActions>
                <Button onClick={validarYEnviar} color="secondary" variant="contained">
                      Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default ModalCambioPass