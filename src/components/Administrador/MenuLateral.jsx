import React, {useState} from 'react'
import { MenuItem, MenuList, Paper, Typography } from '@mui/material'
import {blue, grey} from '@mui/material/colors'

const MenuLateral = (props) => {

    const {
        selected,
        setSelected
    } = props
  return (
      <>
          <Paper style={{width:"200px"}}>
                <MenuList>
                                
                    <MenuItem 
                        style={styles.menuItem}
                        selected={selected === "altaUsuarios" ? true : false}
                        onClick={()=>{setSelected("altaUsuarios")}}
                    >
                        <Typography><strong>Alta Usuarios</strong></Typography>
                    </MenuItem>

                    <MenuItem
                        style={styles.menuItem}
                        selected={selected === "inscripciones" ? true : false}
                        onClick={()=>{setSelected("inscripciones")}}
                    >
                        <Typography><strong>Inscripciones</strong></Typography>
                    </MenuItem>

                    <MenuItem 
                        style={styles.menuItem}
                        selected={selected === "cuatrimestres" ? true : false}
                        onClick={()=>{setSelected("cuatrimestres")}}
                    >
                        <Typography><strong>Gestión Cuatrimestres</strong></Typography>
                    </MenuItem>
              
                    <MenuItem 
                        style={styles.menuItem}
                        selected={selected === "examenes" ? true : false}
                        onClick={()=>{setSelected("examenes")}}
                    >
                        <Typography><strong>Gestión Exámenes</strong></Typography>
                    </MenuItem>

                </MenuList>
          </Paper>
      </>

  )
}

export default MenuLateral

const styles = {
    menuItem:{
        '&:selected': {
            backgroundColor: grey[500],
        },
        height:50,
        color: blue[700],
        fontSize:14,
    }
}
