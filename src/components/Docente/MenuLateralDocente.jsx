import React from 'react'
import { MenuItem, MenuList, Paper, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'


const MenuLateralDocente = (props) => {

    const {
        selected,
        setSelected
    } = props


    return (
        <>
            <Paper style={{ width: "200px" }}>
                <MenuList>
                    <MenuItem
                        style={styles.menuItem}
                        selected={selected === "cursadas" ? true : false}
                        onClick={() => { setSelected("cursadas") }}
                    >
                        <Typography><strong>Cursadas</strong></Typography>
                    </MenuItem>

                    <MenuItem
                        style={styles.menuItem}
                        selected={selected === "finales" ? true : false}
                        onClick={() => { setSelected("finales") }}
                    >
                        <Typography><strong>Finales</strong></Typography>
                    </MenuItem>
                </MenuList>
            </Paper>
        </>

    )
}

export default MenuLateralDocente

const styles = {
    menuItem: {
        '&:selected': {
            backgroundColor: grey[500],
        },
        height: 50,
        color: blue[700],
        fontSize: 14,
    }
}
