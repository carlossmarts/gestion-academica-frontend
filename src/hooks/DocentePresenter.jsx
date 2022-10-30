import { useState } from "react"
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

    const traerAlumnosYNotas = async (idDocente) => {
        try {
            console.log("llamando al servicio traerAlumnosYNotas");
            const res = await axios.get(`${baseUrl}/alumnos/cursada?idDocente=${idDocente}`)
            const ret = await res.data;
            return ret
        } catch (err) {
            console.error(err)
        }
    }
    

    return {
        traerMateriasDocente,
        traerAlumnosYNotas,
        actualizarNotas
    }
}