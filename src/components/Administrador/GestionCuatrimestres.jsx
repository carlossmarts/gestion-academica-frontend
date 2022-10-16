import React, {useState} from 'react'
import {Grid, IconButton, Typography, TextField, MenuItem} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import {styles} from '../../styles/styles'

import Acordeon from '../commons/Acordeon'
import AltaCursadaOExamen from './AltaCursadaOExamen';

const GestionCuatrimestres = () => {
  return (
    <Grid container>
		<Grid item xs={10}>
			<BuscarCursadas/>
			<hr style={{width:"100%"}}/>
			<AltaCursadaOExamen origen={"cursada"}/>
		</Grid>
    </Grid>
  )
}

export default GestionCuatrimestres

const BuscarCursadas = (props) =>{

  const [anio, setAnio] = useState(2022)
  const [periodo, setPeriodo] = useState(0)

  const download = ()=>{
      alert(`TODO- descargar listado cursadas por cuatrimestre PDF \n año: ${anio}, periodo: ${periodo}`)
  }

  return (
      <Grid container spacing={2}>
			<Grid item xs={12}>
          		<Typography style={styles.title}> Descargar cursadas por cuatrimestre</Typography>
			</Grid>
          	<Grid item xs={12} container alignItems="center" spacing={1}>
              	<Grid item xs={6} md={3} container justifyContent="flex-start">
                  	<TextField
						label="Año"
						name="anio"
						type="number"
						value={anio}
						onChange={(e)=>{setAnio(e.target.value)}}
						variant="outlined"
						size="small"
					/>
              	</Grid>
			<Grid item xs={6} md={3} container justifyContent="flex-start">
                <TextField
                    fullWidth
                    name="periodo"
                    label="Periodo"
                    select
                    size="small"
                    value={periodo}
                    onChange={(e)=>setPeriodo(e.target.value)}
                >
                        <MenuItem key={0} value={0}>
                            Seleccione...
                        </MenuItem>
                        <MenuItem key={1} value={1}>
                            Primer Cuatrimestre
                        </MenuItem>
                        <MenuItem key={2} value={2}>
                            Segundo Cuatrimestre
                        </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={3} container justifyContent="flex-start">
                  <IconButton onClick={download} disabled={anio === "" || periodo === 0}>
                      <PictureAsPdfIcon style={styles.pdf}/>
                  </IconButton>
              </Grid>
          </Grid>

      </Grid>
  )
}
