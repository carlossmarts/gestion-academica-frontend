import { useState } from "react"
import axios from "axios"


export const useUsuarioPresenter = () => {

    const baseUrl = "https://gestion-academica-api.herokuapp.com/api/v1/usuario"

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

    

    return {
        traerIdUsuario,
        altaUsuario,
        modificarUsuario
    }
}