
//React
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//material
import { createTheme, ThemeProvider } from '@mui/material/styles';
//components
import Home from './screens/Home';
import ResponsiveNav from './components/ResponsiveNav'
import UserProvider from './context/UserContext';
import Login from './screens/Login'
import Registro from './screens/Registro'
import TestUseContext from './components/TestUseContext';


const App = () => {
  const theme = createTheme();

  return (
      <UserProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter basename="/">
            <ResponsiveNav />
            {/* <TestUseContext/> */}
            <Routes>
              <Route exact path={'/'} element={<Home/>} />
              <Route exact path={'/login'} element={<Login />} />
              <Route exact path={'/registro'} element={<Registro />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </UserProvider>
  );
}

export default App;