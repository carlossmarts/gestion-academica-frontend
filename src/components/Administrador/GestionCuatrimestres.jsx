import React, {useState, useEffect} from 'react'
import {Grid, Box, Button, IconButton, Typography, TextField, MenuItem} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import {styles} from '../../styles/styles'
import { useAdministracionPresenter } from '../../hooks/AdministracionPresenter';
import { useUsuarioPresenter } from '../../hooks/UsuarioPresenter'

const GestionCuatrimestres = () => {
  return (
    <Grid container>
		<Grid item xs={10}>
			<BuscarCursadas/>
			<hr style={{width:"100%"}}/>
			<AgregarCursada/>
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

const AgregarCursada = (props) =>{

	const {getCarreras, getMateriasByCarrera} = useAdministracionPresenter()
	const {getDocentesByCarrera} = useUsuarioPresenter()

	const [carreras, setCarreras] = useState([])
	const [materias, setMaterias] = useState([])
	const [docentes, setDocentes] = useState([])
	const [carrera, setCarrera] = useState(0)

	const [disabled, setDisabled] = useState(true)

	//form
	const [anio, setAnio] = useState(2022)
	const [periodo, setPeriodo] = useState(0)
	const [dia, setDia] = useState(0)
	const [inicio, setInicio] = useState(null)
	const [fin, setFin] = useState(null)
	const [idMateria, setIdMateria] = useState(0)
	const [idTurno, setIdTurno] = useState(0)
	const [idDocente, setIdDocente] = useState(0)

	//error
	const newError = {
		anio: false,
		periodo: false,
		dia: false,
		inicio: false,
		fin: false,
		idMateria: false,
		idTurno: false,
		idDocente: false,
	}
	const [error, setError] = useState(newError)

	const diasCursada = [
		{ nro: 0, dia: "seleccione"},
		{ nro: 1, dia: "lunes"},
		{ nro: 2, dia: "martes"},
		{ nro: 3, dia: "miércoles"},
		{ nro: 4, dia: "jueves"},
		{ nro: 5, dia: "viernes"},
		{ nro: 6, dia: "sábado"},
	]

	const turnos = [
		{ idTurno: 1, nombre: "Mañana"},
		{ idTurno: 2, nombre: "Tarde"},
		{ idTurno: 3, nombre: "Noche"},
	]

	useEffect(()=>{
        getCarreras()
        .then( res => setCarreras(res))
        .catch(e=>console.log(e))
    }, [])

	useEffect(()=>{
		getDocentesByCarrera(carrera)
		.then( res => setDocentes(res))
        .catch(e=>console.log(e))
		
		getMateriasByCarrera(carrera)
		.then( res => setMaterias(res))
        .catch(e=>console.log(e))
		
	}, [carrera])

	const validar  = ()=>{
		let retorno = true
		let tempError = newError
		if(!anio){
			tempError["anio"]= true
			retorno = false
		}
		if(periodo === 0 || !periodo){
			tempError["periodo"]= true
			retorno = false
		}
		if(idDocente === 0 || !idDocente){
			tempError["idDocente"]= true
			retorno = false
		}
		if(idTurno === 0 || !idTurno){
			tempError["idTurno"]= true
			retorno = false
		}
		if(idMateria === 0 || !idMateria){
			tempError["idTurno"]= true
			retorno = false
		}
		if(dia === 0 || !dia){
			tempError["dia"]= true
			retorno = false
		}
		if(!inicio){
			tempError["inicio"]= true
			retorno = false
		}
		if(!fin){
			tempError["fin"]= true
			retorno = false
		}
		setError(tempError)
		return retorno
	}

	const agregarCursada = ()=>{
		if(!validar()) {
			alert("faltan campos obligatorios")
		} else {
			alert(`TODO- agregar cursada \n año: ${anio}, periodo: ${periodo}, dia: ${dia}, 
			horaInicio: ${inicio.format("hh:mm")} , horaFin: ${fin.format("hh:mm")}, idTurno: ${idTurno}, idDocente: ${idDocente}`)
		}
	}

  return(
	
	<Grid container spacing={2}>
		<Grid item container xs={12}>
          	<Typography style={styles.title}> Agregar cursada</Typography>
		</Grid>
		<Grid item container xs={12}>
		{
			carreras !== undefined ?
				carreras.length !== 0 ?
					<TextField
						style={{width:"50%"}}
						name="idCarrera"
						select
						size="small"
						label="Carrera"
						value={carrera}
						onChange={(e)=>{setCarrera(e.target.value)}}
					>
						{carreras.map((option) => (
							<MenuItem key={option.idCarrera} value={option.idCarrera}>
								{option.nombre}
							</MenuItem>
						))}
					</TextField>
				: <Typography>Cargando carreras...</Typography>
			: null
		}
		</Grid>
		{
			carrera ?
				<Grid item xs={12} container alignItems="center" spacing={1}>
					<Grid item xs={6} md={3}>
						{
							materias !== undefined ?
								materias.length !== 0 ?
										<TextField
											fullWidth
											select
											size="small"
											label="Materia"
											value={idMateria}
											onChange={(e)=>{setIdMateria(e.target.value)}}
											error={error.idDocente}
										>
											{materias.map((option) => (
												<MenuItem key={option.idMateria} value={option.idMateria}>
													{option.nombre}
												</MenuItem>
											))}
										</TextField>
								: <Typography>Cargando docentes...</Typography>
							: <Typography>Cargando docentes...</Typography>
						}
					</Grid>
					<Grid item xs={6} md={3}>
						{
							docentes !== undefined ?
								docentes.length !== 0 ?
										<TextField
											fullWidth
											select
											size="small"
											label="Docente"
											value={idDocente}
											onChange={(e)=>{setIdDocente(e.target.value)}}
											error={error.idDocente}
										>
											{docentes.map((option) => (
												<MenuItem key={option.idUsuario} value={option.idUsuario}>
													{`${option.apellido}${option.idDocente!== 0 ?", ": ""} ${option.nombre}`}
												</MenuItem>
											))}
										</TextField>
								: <Typography>Cargando docentes...</Typography>
							: null
						}
					</Grid>					
					<Grid item xs={6} md={3} container justifyContent="flex-start">
						<TextField
							label="Año"
							name="anio"
							type="number"
							value={anio}
							onChange={(e)=>{setAnio(e.target.value)}}
							variant="outlined"
							size="small"
							error = {error.anio}
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
							onChange={(e)=> {setPeriodo(e.target.value)}}
							error = {error.periodo}
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
					<Grid item xs={6} md={3}>
						<TextField
							fullWidth
							select
							size="small"
							label="Turno"
							value={idTurno}
							onChange={(e)=>{setIdTurno(e.target.value)}}
						>
							{turnos.map((option) => (
								<MenuItem key={option.idTurno} value={option.idTurno}>
									{option.nombre}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={6} md={3}>
						<TextField
							fullWidth
							select
							size="small"
							label="Dia"
							value={dia}
							onChange={(e)=>{setDia(e.target.value)}}
						>
							{diasCursada.map((option) => (
								<MenuItem key={option.nro} value={option.nro}>
									{option.dia}
								</MenuItem>
							))}
						</TextField>
					</Grid>

					<Grid item xs={6} md={3} container justifyContent="flex-start">
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<TimePicker
								label="Hora inicio"
								value={inicio}
								onChange={(newValue) => {
								setInicio(newValue);
								}}
								renderInput={(params) => <TextField {...params} size="small"/>}
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={6} md={3} container justifyContent="flex-start">
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<TimePicker
								label="Hora Fin"
								value={fin}
								onChange={(newValue) => {
								setFin(newValue);
								}}
								renderInput={(params) => <TextField {...params} size="small"/>}
							/>
						</LocalizationProvider>
					</Grid>
				
					<Grid item xs={12} container justifyContent="flex-start">
						<Button onClick={agregarCursada} variant="contained" color="primary" >
							Agregar
						</Button>
					</Grid>
				</Grid>
			: null
		}
			

      </Grid>
  )
}