import axios from "axios"

const inscripciones =
    [
        {
            "descripcion": "Tercer turno de exámenes finales",
            "idInscripcion": "5",
            "idInstancia": "2",
            "instancia": "Mesa de exámen"
        },
        {
            "descripcion": "Cuarto turno de exámenes finales",
            "idInscripcion": "6",
            "idInstancia": "2",
            "instancia": "Mesa de exámen"
        }
    ]

const materias =
    [{ "diaHorario": "Lunes 9 a 13 hs", "docente": "Vidal, Teresita", "idComision": "1", "idDia": "1", "materia": "Programaci\u00f3n de Computadoras", "turno": "Ma\u00f1ana" }, { "diaHorario": "Martes 9 a 13 hs", "docente": "Scillama, Mora", "idComision": "2", "idDia": "2", "materia": "Arquitectura de Computadoras", "turno": "Ma\u00f1ana" }, { "diaHorario": "Miercoles 9 a 13 hs", "docente": "Feced, Lucia", "idComision": "3", "idDia": "3", "materia": "Matem\u00e1tica 2", "turno": "Ma\u00f1ana" }, { "diaHorario": "Jueves 9 a 13 hs", "docente": "Capponi, Fabian", "idComision": "4", "idDia": "4", "materia": "Introducci\u00f3n al Pensamiento Cient\u00edfico", "turno": "Ma\u00f1ana" }, { "diaHorario": "Viernes 9 a 13 hs", "docente": "Szuchter, Gustavo", "idComision": "5", "idDia": "5", "materia": "Introducci\u00f3n a las Bases de Datos", "turno": "Ma\u00f1ana" }, { "diaHorario": "Lunes 9 a 13 hs", "docente": "Casavalle, Alejandro", "idComision": "6", "idDia": "1", "materia": "Orientaci\u00f3n a Objetos 1", "turno": "Ma\u00f1ana" }, { "diaHorario": "Martes 9 a 13 hs", "docente": "Perticone, Karina", "idComision": "7", "idDia": "2", "materia": "Introducci\u00f3n a los Sistemas Operativos", "turno": "Ma\u00f1ana" }, { "diaHorario": "Miercoles 9 a 13 hs", "docente": "Iglesias, Federico", "idComision": "8", "idDia": "3", "materia": "Probabilidad y Estad\u00edstica", "turno": "Ma\u00f1ana" }, { "diaHorario": "Jueves 9 a 13 hs", "docente": "Quattromano, Roberto", "idComision": "9", "idDia": "4", "materia": "Ingenier\u00eda de Software 2", "turno": "Ma\u00f1ana" }, { "diaHorario": "Lunes 18 a 22 hs", "docente": "Linares, Gustavo", "idComision": "16", "idDia": "1", "materia": "Sistemas y organizaciones", "turno": "Noche" }, { "diaHorario": "Martes 18 a 22 hs", "docente": "Carpinacci, Martin", "idComision": "17", "idDia": "2", "materia": "Proyecto de Software", "turno": "Noche" }, { "diaHorario": "Miercoles 18 a 22 hs", "docente": "Hoffmann, Federico", "idComision": "18", "idDia": "3", "materia": "Redes y comunicaciones", "turno": "Noche" }, { "diaHorario": "Lunes 13 a 18 hs", "docente": "Seco, Lucila", "idComision": "22", "idDia": "1", "materia": "Ingenier\u00eda de Software 3", "turno": "Tarde" }, { "diaHorario": "Martes 13 a 18 hs", "docente": "Bianchi, Leandro", "idComision": "23", "idDia": "2", "materia": "Bases de Datos 2", "turno": "Tarde" }, { "diaHorario": "Miercoles 13 a 18 hs", "docente": "Mura, Martin", "idComision": "24", "idDia": "3", "materia": "Fundamentos de Teor\u00eda de la Computaci\u00f3n", "turno": "Tarde" }, { "diaHorario": "Jueves 13 a 18 hs", "docente": "Coelho, Christian", "idComision": "25", "idDia": "4", "materia": "Sistemas Operativos", "turno": "Tarde" }, { "diaHorario": "Viernes 13 a 18 hs", "docente": "Malewicz, Pamela", "idComision": "26", "idDia": "5", "materia": "Desarrollo de software en Sistemas Distribuidos", "turno": "Tarde" }, { "diaHorario": "Lunes 13 a 18 hs", "docente": "Steinberg, Natasha", "idComision": "27", "idDia": "1", "materia": "Matem\u00e1tica Discreta", "turno": "Tarde" }]
const yaInscripto =
    [{ "descripcion": "Segundo cuatrimestre 2022", "docente": "Vidal, Teresita", "idComision": "1", "materia": "Programaci\u00f3n de Computadoras", "turno": "Ma\u00f1ana" }, { "descripcion": "Segundo cuatrimestre 2022", "docente": "Scillama, Mora", "idComision": "2", "materia": "Arquitectura de Computadoras", "turno": "Ma\u00f1ana" }]

export const useEstudiantePresenter = () => {

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
            console.log("traer tipos de inscripciones disponibles con idInscripcion "+idInscripcion+" y idCarrera" + idCarrera);
            const url = `https://gestion-academica-middleware.herokuapp.com/estudiantes/?operacion=traerMateriasPorInscripcionPorCarrera&idInscripcion=${idInscripcion}&idCarrera=${idCarrera}`
            const res = await axios.get(url);
            const materias = await res.data.return.materiasIncripcionCarrera
            console.log("traerMateriasPorInscripcionPorCarrera response ", JSON.stringify(materias))
            return materias;
        } catch (err) {
            console.error(err)
        }
    }

    const traerInscripcionesAlumno = async (idAlumno) => {
        try {
            console.log("traer tipos de inscripciones disponibles");
            const url = `https://gestion-academica-middleware.herokuapp.com/estudiantes/?operacion=traerInscripcionesPorEstudiante&idUsuario=${idAlumno}`
            const res = await axios.get(url);
            const yaInscripto = await res.data.return.inscripcionesEstudiante;
            console.log("traerInscripcionesAlumno response ", JSON.stringify(res))
            return yaInscripto
        } catch (err) {
            console.error(err)
        }
    }

    const altaInscripcionEstudiante = async (idUsuario, idInscripcion, idComision) => {
        try {
            console.log("llamando al servicio altaInscripcionEstudiante con idUsuario idInscripcion idComision", idUsuario, idInscripcion, idComision);
            const url = `https://gestion-academica-middleware.herokuapp.com/estudiantes/?operacion=altaInscripcionEstudiante&idUsuario=${idUsuario}&idInscripcion=${idInscripcion}&idComision=${idComision}`
            const res = await axios.get(url);
            console.log(JSON.stringify(res))
            return res.data.return.estado
        } catch (err) {
            console.error(err)
        }
    }

    const bajaInscripcionEstudiante = async (idDetalleInscripcion) => {
        try {
            console.log("llamando al servicio bajaInscripcionEstudiante con idDetalleInscripcion " + idDetalleInscripcion)
            const url = `https://gestion-academica-middleware.herokuapp.com/estudiantes/?operacion=bajaInscripcionEstudiante&idDetalleInscripcion=${idDetalleInscripcion}`
            const res = await axios.get(url);
            console.log("??" + JSON.stringify(res.data.return.estado))
            return res.data.return.estado
            
        } catch (err) {
            console.error(err)
        }
    }

    const traerAnalitico = async (idEstudiante) => {
        try {
            const config = {
                headers: {
                    'responseType': 'blob',
                    'Content-Type': 'application/octet-stream; charset=utf-8',
                    'Content-Disposition': "attachment;filename=coso.pdf"
                }
            }
            console.log("traer analitico");
            //TODO actualizar id
            const url = `https://gestion-academica-middleware.herokuapp.com/reportes/?operacion=traerMateriasAprobadasPorEstudiante&idUsuario=1`
            const res = await axios.get(url);
            return res
        } catch (err) {
            console.error(err)
        }
    }

    return {
        traerTipoInscripciones,
        traerMateriasPorInscripcionPorCarrera,
        traerInscripcionesAlumno,
        altaInscripcionEstudiante,
        bajaInscripcionEstudiante,
        traerAnalitico
    }
}