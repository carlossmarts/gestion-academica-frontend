
//React
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//material
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
//components
import Home from './screens/Home';
import ResponsiveNav from './components/commons/ResponsiveNav'
import UserProvider from './context/UserContext';
import Login from './screens/Login'
import Administracion from './screens/Administrador/Administracion';
import Reportes from './components/Administrador/Reportes';


const App = () => {
  const theme = createTheme();

  return (
      <UserProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter basename="/">
            <ResponsiveNav />
            {/* <TestUseContext/> */}
            <Box p={4}>
            <Routes>
              <Route exact path={'/'} element={<Home/>} />
              <Route exact path={'/login'} element={<Login />} />
              <Route exact path={'/administracion'} element={<Administracion />} />
              <Route exact path={'/reportes'} element={<Reportes />} />
            </Routes>
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </UserProvider>
  );
}

export default App;