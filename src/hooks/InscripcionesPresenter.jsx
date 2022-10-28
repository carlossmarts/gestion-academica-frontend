import { useState } from "react"
import axios from "axios"


export const useInscripcionesPresenter = () => {

    const baseUrl = "https://gestion-academica-api.herokuapp.com/api/v1/usuario"

    const traerTipoInscripciones = async () => {
        try {            
            console.log("traer tipos de inscripciones disponibles");
            const url = `https://gestion-academica-middleware.herokuapp.com/estudiantes/?operacion=traerInscripcionesActivas`
            const res = await axios.get(url);
            const inscripciones = await res.data.inscripciones;
            console.log( "traerTipoInscripciones response ", inscripciones)
            return inscripciones;
                } catch (err) {
            console.error(err)
        }
    }

    const traerMateriasPorInscripcionPorCarrera = async (idInscripcion, idCarrera) => {
        try {
            console.log("llamando al servicio traerMateriasPorInscripcionPorCarrera con idInscripcion",
                idInscripcion, idCarrera);
            return '[{ "descripcion": "Segundo cuatrimestre 2022", "docente": "Vidal, Teresita", "idComision": "1", "materia": "Programaci\u00f3n de Computadoras", "turno": "Ma\u00f1ana" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Scillama, Mora", "idComision": "2", "materia": "Arquitectura de Computadoras", "turno": "Ma\u00f1ana" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Feced, Lucia", "idComision": "3", "materia": "Matem\u00e1tica 2", "turno": "Ma\u00f1ana" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Capponi, Fabian", "idComision": "4", "materia": "Introducci\u00f3n al Pensamiento Cient\u00edfico", "turno": "Ma\u00f1ana" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Szuchter, Gustavo", "idComision": "5", "materia": "Introducci\u00f3n a las Bases de Datos", "turno": "Ma\u00f1ana" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Casavalle, Alejandro", "idComision": "6", "materia": "Orientaci\u00f3n a Objetos 1", "turno": "Ma\u00f1ana" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Perticone, Karina", "idComision": "7", "materia": "Introducci\u00f3n a los Sistemas Operativos", "turno": "Ma\u00f1ana" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Iglesias, Federico", "idComision": "8", "materia": "Probabilidad y Estad\u00edstica", "turno": "Ma\u00f1ana" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Quattromano, Roberto", "idComision": "9", "materia": "Ingenier\u00eda de Software 2", "turno": "Ma\u00f1ana" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Linares, Gustavo", "idComision": "16", "materia": "Sistemas y organizaciones", "turno": "Noche" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Carpinacci, Martin", "idComision": "17", "materia": "Proyecto de Software", "turno": "Noche" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Hoffmann, Federico", "idComision": "18", "materia": "Redes y comunicaciones", "turno": "Noche" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Seco, Lucila", "idComision": "22", "materia": "Ingenier\u00eda de Software 3", "turno": "Tarde" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Bianchi, Leandro", "idComision": "23", "materia": "Bases de Datos 2", "turno": "Tarde" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Mura, Martin", "idComision": "24", "materia": "Fundamentos de Teor\u00eda de la Computaci\u00f3n", "turno": "Tarde" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Coelho, Christian", "idComision": "25", "materia": "Sistemas Operativos", "turno": "Tarde" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Malewicz, Pamela", "idComision": "26", "materia": "Desarrollo de software en Sistemas Distribuidos", "turno": "Tarde" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Steinberg, Natasha", "idComision": "27", "materia": "Matem\u00e1tica Discreta", "turno": "Tarde" }]'
        } catch (err) {
            console.error(err)
        }
    }

    const traerInscripcionesAlumno = async (idAlumno, idCarrera) => {
        try {
            console.log("llamando al servicio traerMateriasPorInscripcionPorCarrera con idInscripcion",
            idAlumno, idCarrera);
            //https://gestion-academica-middleware.herokuapp.com/estudiantes/?operacion=traerInscripcionesPorEstudiante&idUsuario=4
            return '[{"anio":"2022","descripcion":"Segundo cuatrimestre 2022","docente":"Vidal, Teresita","estado":"No activo","idDetalleEstudiante":"25","materia":"Programaci\u00f3n de Computadoras","turno":"Ma\u00f1ana"},{"anio":"2022","descripcion":"Segundo cuatrimestre 2022","docente":"Perticone, Karina","estado":"No activo","idDetalleEstudiante":"26","materia":"Introducci\u00f3n a los Sistemas Operativos","turno":"Ma\u00f1ana"},{"anio":"2022","descripcion":"Segundo cuatrimestre 2022","docente":"Casavalle, Alejandro","estado":"No activo","idDetalleEstudiante":"27","materia":"Orientaci\u00f3n a Objetos 1","turno":"Ma\u00f1ana"},{"anio":"2022","descripcion":"Segundo cuatrimestre 2022","docente":"Szuchter, Gustavo","estado":"No activo","idDetalleEstudiante":"28","materia":"Introducci\u00f3n a las Bases de Datos","turno":"Ma\u00f1ana"},{"anio":"2022","descripcion":"Segundo cuatrimestre 2022","docente":"Vidal, Teresita","estado":"No activo","idDetalleEstudiante":"29","materia":"Programaci\u00f3n de Computadoras","turno":"Ma\u00f1ana"},{"anio":"2022","descripcion":"Segundo cuatrimestre 2022","docente":"Perticone, Karina","estado":"Activo","idDetalleEstudiante":"30","materia":"Introducci\u00f3n a los Sistemas Operativos","turno":"Ma\u00f1ana"},{"anio":"2022","descripcion":"Segundo cuatrimestre 2022","docente":"Casavalle, Alejandro","estado":"Activo","idDetalleEstudiante":"31","materia":"Orientaci\u00f3n a Objetos 1","turno":"Ma\u00f1ana"},{"anio":"2022","descripcion":"Segundo cuatrimestre 2022","docente":"Szuchter, Gustavo","estado":"Activo","idDetalleEstudiante":"32","materia":"Introducci\u00f3n a las Bases de Datos","turno":"Ma\u00f1ana"},{"anio":"2022","descripcion":"Tercer turno de ex\u00e1menes finales 2022","docente":"Vidal, Teresita","estado":"Activo","idDetalleEstudiante":"33","materia":"Programaci\u00f3n de Computadoras","turno":"Ma\u00f1ana"}]'
        } catch (err) {
            console.error(err)
        }
    }

    const altaInscripcionEstudiante = async (dUsuario, idInscripcion, idComision) => {
        try {
            console.log("llamando al servicio altaInscripcionEstudiante con body", dUsuario, idInscripcion, idComision);
            return "SUCCESS"
        } catch (err) {
            console.error(err)
        }
    }

    const bajaInscripcionEstudiante = async (idDetalleInscripcion) => {
        try {
            console.log("llamando al servicio bajaInscripcionEstudiante")
            return "SUCCESS"
        } catch (err) {
            console.error(err)
        }
    }



    return {
        traerTipoInscripciones,
        traerMateriasPorInscripcionPorCarrera,
        traerInscripcionesAlumno,
        altaInscripcionEstudiante,
        bajaInscripcionEstudiante
    }
}