import { useState } from "react"
import axios from "axios"


export const useUsuarioPresenter = () => {

    const baseUrl = "https://gestion-academica-api.herokuapp.com/api/v1/usuario"
    const defaultUsuario = {idUsuario:0, nombre:"", apellido:"seleccione..."}

    const traerIdUsuario = async (username, password) => {
        try {
            console.log("llamando al servicio usuarioLogin con username", username, "y contraseña", password);
            const url = `${baseUrl}/login?username=${username}&password=${password}`
            const res = await axios.post(url);
            const user = await res.data;
            console.log( "traer IdUsuario res ", user)
            return user;
        } catch (err) {
            console.error(err)
        }
    }
    
    const traerUsuarioPorId = async (idUsuario) => {
        try {
            console.log("llamando al servicio traerUsuarioPorId con id ", idUsuario);
            const url = `${baseUrl}/${idUsuario}`
            const res = await axios.get(url);
            const user = await res.data;
            console.log( "traer IdUsuario res ", user)
            return user;
        } catch (err) {
            console.error(err)
        }
    }
    const altaUsuario = async (body) => {
        try {
            console.log("llamando al servicio altaUsuario con body", body);
            const res = await axios.post(`${baseUrl}/`, body)
            const ret = await res.data;
            return ret
        } catch (err) {
            console.error(err)
        }
    }

    const modificarUsuario = async (body) => {
        try {
            console.log("llamando al servicio modificarUsuario con body", body);
            const res = await axios.put(`${baseUrl}/${body.idUsuario}`, body)
            const ret = await res.data;
            return ret
        } catch (err) {
            console.error(err)
        }
    }

    const getDocentesByCarrera = async (idCarrera)=>{
        try {
            console.log("llamando al servicio getDocentesByCarrera")
            const url = `${baseUrl}/docentes/${idCarrera}`
            const res = await axios.get(url);
            const docentes = await res.data;
            docentes.unshift(defaultUsuario)
            console.log( "getDocentesByCarrera response ", docentes)
            return docentes;
        } catch (err) {
            console.error(err)
        }
    }

    const getEstudiantes = async ()=>{
        try {
            console.log("llamando al servicio getEstudiantes")
            const url = `${baseUrl}/estudiantes`
            const res = await axios.get(url);
            const estudiantes = await res.data;
            estudiantes.unshift(defaultUsuario)
            console.log( "getEstudiantes response ", estudiantes)
            return estudiantes;
        } catch (err) {
            console.error(err)
        }
    }

    

    return {
        defaultUsuario,
        traerIdUsuario,
        traerUsuarioPorId,
        altaUsuario,
        modificarUsuario,
        getDocentesByCarrera,
        getEstudiantes
    }
}