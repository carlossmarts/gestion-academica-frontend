
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

    return {
        getCarreras
    }
}