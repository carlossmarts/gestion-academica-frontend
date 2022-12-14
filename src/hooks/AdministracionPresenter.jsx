
import axios from 'axios'

import {getCurrentDate} from "../UtilsMethods";
import {useState} from "react";

export const useAdministracionPresenter = () => {

    const baseUrl = "https://gestion-academica-api.herokuapp.com/api/administracion"
    const baseUrlRep = "https://gestion-academica-middleware.herokuapp.com/reportes"

    const defaultCarrera = {idCarrera:0, nombre:"seleccione..."}
    const defaultTurno = {idTurno:0, nombre:"seleccione..."}
    const defaultMateria = {idMateria:0, nombre:"seleccione..."}
    const defaultInscripcion = { idInscripcion:0, descripcion:"seleccione..."}
    const defaultComision = { idComision:0, comision:"seleccione..."}


    const getCarreras = async () => {
        try {
            console.log("llamando al servicio getCarreras")
            const url = `${baseUrl}/carreras`
            const res = await axios.get(url);
            const carreras = await res.data;
            carreras.unshift(defaultCarrera)
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
            turnos.unshift(defaultTurno)
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
            materias.unshift(defaultMateria)
            console.log( "getMateriasByCarreraresponse ", materias)
            return materias;
        } catch (err) {
            console.error(err)
        }
    }

    const getComisionesPorInstanciaYMateria = async(idInstancia, idMateria)=>{
        try {
            console.log("llamando al servicio getComisionesPorInstanciaYMateria con instancia" + idInstancia + " y materia: " + idMateria)
            const url = `${baseUrlRep}/?operacion=traerComisionesPorInstanciaYMateria&idInstancia=${idInstancia}&idMateria=${idMateria}`
            const res = await axios.get(url);
            const ret = await res.data.return;
            const dataComisiones = ret.comisiones !== undefined ? ret.comisiones : []
            let comisiones = Array.isArray(dataComisiones) ? dataComisiones : [dataComisiones]
            comisiones.unshift(defaultComision)
            console.log( "getComisionesPorInstanciaYMateria", comisiones)
            return comisiones;
        } catch (err) {
            console.error(err)
        }
    }

    const saveInscripcion = async (body) =>{
        try {
            console.log("llamando al servicio saveInscripcion - body", body)
            const url = `${baseUrl}/inscripcion`
            const res = await axios.post(url, body);
            const data = await res.data;
            console.log( "saveInscripcion response ", data)
            return data
        } catch (err) {
            console.error(err)
        }
    }

    const getInscripciones = async(idInstancia, fecha) =>{
        try {
            console.log(`llamando al servicio getInscripciones con idInstancia: ${idInstancia} y fecha ${fecha}`)
            let url = `${baseUrl}/inscripcion?idInstancia=${idInstancia}`
            if(fecha !== undefined){
                url += `&fechaActual=${fecha}`
            }
            const res = await axios.get(url);
            const status = await res.status
            const data = await res.data;
            const inscripciones = status === 200 ? data : []
            inscripciones.unshift(defaultInscripcion)
            console.log( "getInscripciones response ", inscripciones)
            return inscripciones;
        } catch (err) {
            console.error(err)
        }
    }

    const saveCursada = async (body) =>{
        try {
            console.log("llamando al servicio saveCursada - body", JSON.stringify(body))
            const url = `${baseUrl}/cursada`
            const res = await axios.post(url, body);
            const data = await res.data;
            console.log( "saveCursada response ", data)
            return data
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    const saveExamen = async (body) =>{
        try {
            console.log("llamando al servicio saveExamen - body", JSON.stringify(body))
            const url = `${baseUrl}/examen`
            const res = await axios.post(url, body);
            const data = await res.data;
            console.log( "saveExamen response ", data)
            return data
        } catch (err) {
            console.error(err)
            throw err
        }
    }



    return {
        defaultCarrera,
        defaultTurno,
        defaultMateria,
        defaultInscripcion,
        defaultComision,
        getCarreras, 
        getTurnos, 
        getMateriasByCarrera,
        getInscripciones,
        saveInscripcion,
        getComisionesPorInstanciaYMateria,
        saveCursada,
        saveExamen
    }
}