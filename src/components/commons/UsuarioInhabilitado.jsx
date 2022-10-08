import React from 'react'
import { Typography } from '@mui/material'
import {blue} from '@mui/material/colors'


const UsuarioInhabilitado = (props) => {

  const {tipoUsuario} = props
  return (
    <>
      <Typography style={{textAlign:"center", fontSize: 30, color: blue[800]}}>
          Usuario inhabilitado
      </Typography>
      <Typography style={{textAlign:"center", fontSize: 20, color: blue[800]}}>
          El acceso a este módulo requiere logueo como {tipoUsuario}
      </Typography>
    </>
    
  )
}

export default UsuarioInhabilitado