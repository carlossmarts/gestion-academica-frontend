import axios from "axios"

export const useDocentePresenter = () => {

    const baseUrl = "https://gestion-academica-api.herokuapp.com/api/v1/docente"

    const actualizarNotas = async (body) => {
        try {
            console.log("llamando al servicio actualizarNotas con body", body);
            const res = await axios.post(`${baseUrl}/notaComision`, body)
            const ret = await res.data;
            return ret
        } catch (err) {
            console.error(err)
        }
    }

    const traerMateriasDocente = async (idDocente) => {
        try {
            console.log("llamando al servicio traerMateriasDocente");
            const res = await axios.get(`${baseUrl}/materias?idDocente=${idDocente}`)
            const ret = await res.data;            
            return ret
        } catch (err) {
            console.error(err)
        }
    }

    const traerAlumnosYNotas = async (idComision, idDocente) => {
        try {
            console.log("llamando al servicio traerAlumnosYNotas" + idDocente + " " + idComision);
            const res = await axios.get(`${baseUrl}/alumnos/cursada?idDocente=${idDocente}&idComision=${idComision}`)
            const ret = await res.data.alumnos;
            return ret
        } catch (err) {
            console.error(err)
        }
    }

    const traerComisionesDeDocente = async (idDocente) => {
        try {
            console.log("llamando al servicio traerComisionesDeDocente idDocente " + idDocente);
            const res = await axios.get(`${baseUrl}/comision?idDocente=${idDocente}`)
            const ret = await res.data;
            return ret
        } catch (err) {
            console.error(err)
        }
    }

    return {
        traerMateriasDocente,
        traerComisionesDeDocente,
        traerAlumnosYNotas,
        actualizarNotas
    }
}