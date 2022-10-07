import React, { useReducer, useEffect, useState, useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router'
import { UserContext } from '../context/UserContext';
import { Grid } from '@mui/material';

const ResponsiveAppBar = (props) => {

  const{
    usuario,
    setUsuario
  } = props
 
  const history = useNavigate();
  const irAHome = () => { history("/") }

  const {user, setUser, refreshUser} = useContext(UserContext)

  const cerrarSesion = () => {
    refreshUser()
    goTo("/")
  }

  const goTo = (path)=>{
    alert("ir a " + path)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GESTION ACADEMICA
          </Typography>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {
              !user.activo
                ?
                <Grid container justifyContent="flex-end">
                  <Button onClick={()=>goTo("/login")} sx={styles.navItem}>Ingresar</Button>
                  <Button onClick={()=> goTo("/registro")} sx={styles.navItem}>Registrarse</Button>
                </Grid>
                :
                <>
                  {
                    user.tipoUsuario === "admin" ? 
                    <Grid container justifyContent="flex-start" spacing={1}>
                      <Button onClick={()=>goTo("/reportes")} sx={styles.navItem}>Reportes</Button>
                      <Button onClick={()=>goTo("/administracion")} sx={styles.navItem}>Administracion</Button>
                    </Grid>
                    : null
                  }
                  {
                    user.tipoUsuario === "estudiante" ? 
                    <Grid container justifyContent="flex-start" spacing={1}>
                      <Button onClick={()=>goTo("/inscripciones")} sx={styles.navItem}>Inscripciones</Button>
                      <Button onClick={()=>goTo("/analitico")} sx={styles.navItem}>Analitico</Button>
                      <Button onClick={()=>goTo("/misDatos")} sx={styles.navItem}>misDatos</Button>
                    </Grid>
                    : null
                  }
                  {
                    user.tipoUsuario === "docente" ? 
                    <Grid container justifyContent="flex-start" spacing={1}>
                      <Button onClick={()=>goTo("/materias")} sx={styles.navItem}>Materias</Button>
                      <Button onClick={()=>goTo("/notas")} sx={styles.navItem}>Notas</Button>
                    </Grid>
                    : null
                  }
                  <Grid container justifyContent="flex-end">
                    <Button onClick={cerrarSesion} sx={styles.cerrarSesion}>Cerrar Sesion</Button>
                  </Grid>
                    
                </>
            }
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;


const styles = {
  navItem: { color: 'white', display: 'block', pt:2},
  cerrarSesion: { color: 'white', display: 'block'},

}