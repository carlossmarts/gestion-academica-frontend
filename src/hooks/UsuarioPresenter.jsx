import { useState } from "react"
import axios from "axios"


export const useUsuarioPresenter = () => {


    const traerIdUsuario = async (username, password) => {
        try {
            const body = {
                usuario: username,
                clave: password
            }
            console.log("llamando al servicio usuarioLogin con username", username, "y contraseña", password);
            const res = await axios.post('https://localhost:7252/api/usuario/login', body);
            const user = await res.data;
            return user;
        } catch (err) {
            console.error(err)
        }
    }

    const altaUsuario = async (body) => {
        console.log()
        try {
            const res = await axios.post('https://localhost:7252/api/usuario', body)
            const ret = await res.data;
            return ret
        } catch (err) {
            console.error(err)
        }
    }

    return {
        traerIdUsuario,
        altaUsuario
    }
}