
import axios from 'axios'

export const useAdministracionPresenter = () => {

    const baseUrl = "https://gestion-academica-api.herokuapp.com/api/administracion"

    const getCarreras = async () => {
        try {
            console.log("llamando al servicio getCarreras")
            const url = `${baseUrl}/carreras`
            const res = await axios.get(url);
            const carreras = await res.data;
            carreras.unshift({idCarrera:0, nombre:"seleccione..."})
            console.log( "getCarreras response ", carreras)
            return carreras;
        } catch (err) {
            console.error(err)
        }
    }

    const getTurnos = async ()=>{
        try {
            console.log("llamando al servicio getTurnos")
            const url = `${baseUrl}/turnos`
            const res = await axios.get(url);
            const turnos = await res.data;
            turnos.unshift({idTurno:0, nombre:"seleccione..."})
            console.log( "getTurnos response ", turnos)
            return turnos;
        } catch (err) {
            console.error(err)
        }
    }

    const getMateriasByCarrera = async(idCarrera)=>{
        try {
            console.log("llamando al servicio getMateriasByCarrera")
            const url = `${baseUrl}/materias/${idCarrera}`
            const res = await axios.get(url);
            const materias = await res.data;
            materias.unshift({ idMateria:0, nombre:"seleccione..."})
            console.log( "getMateriasByCarrera response ", materias)
            return materias;
        } catch (err) {
            console.error(err)
        }
    }

    return {
        getCarreras, 
        getTurnos, 
        getMateriasByCarrera
    }
}