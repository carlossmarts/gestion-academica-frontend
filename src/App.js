
//React
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//material
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
//components
import Home from './screens/Home';
import ResponsiveNav from './components/commons/ResponsiveNav'
import UserProvider from './context/UserContext';
import UtilsProvider from "./context/UtilsContext";
import Login from './screens/Login'
import Administracion from './screens/Administrador/Administracion';
import Reportes from './components/Administrador/Reportes';
import GestionInscripcionesAlumno from './screens/Estudiante/GestionInscripcionesAlumno';
import GestionDocente from './screens/Docente/GestionDocente';
import EdicionPerfil from './components/commons/EdicionPerfil';
import MateriasDocente from './screens/Docente/MateriasDocente';



const App = () => {
  const theme = createTheme({
    palette:{
      primary: {
        main:"#780129"
      }
    },
  });

  return (
    <UtilsProvider>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter basename="/">
            <ResponsiveNav />
            {/* <TestUseContext/> */}
            <Box p={4}>
              <Routes>
                <Route exact path={'/'} element={<Home />} />
                <Route exact path={'/login'} element={<Login />} />
                <Route exact path={'/administracion'} element={<Administracion />} />
                <Route exact path={'/inscripciones'} element={<GestionInscripcionesAlumno />} />
                <Route exact path={'/reportes'} element={<Reportes />} />
                <Route exact path={'/perfil/:id'} element={<EdicionPerfil />} />
                <Route exact path={'/docente'} element={<GestionDocente />} />
                <Route exact path={'/materiasasignadas'} element={<MateriasDocente />} />
              </Routes>
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </UserProvider>
    </UtilsProvider>
  );
}

export default App;