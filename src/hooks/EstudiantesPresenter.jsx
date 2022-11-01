import axios from "axios"

export const useEstudiantePresenter = () => {

    const baseUrl = "https://gestion-academica-middleware.herokuapp.com/estudiantes"

    const traerTipoInscripciones = async () => {
        try {
            console.log("traer tipos de inscripciones disponibles");
            const url = `${baseUrl}/?operacion=traerInscripcionesActivas`
            const res = await axios.get(url);
            const inscripciones = await res.data.inscripciones;
            console.log("traerTipoInscripciones response ", inscripciones)
            return inscripciones;
        } catch (err) {
            console.error(err)
        }
    }

    const traerMateriasPorInscripcionPorCarrera = async (idInscripcion, idCarrera) => {
        try {
            console.log("traer tipos de inscripciones disponibles con idInscripcion " + idInscripcion + " y idCarrera" + idCarrera);
            const url = `${baseUrl}/?operacion=traerMateriasPorInscripcionPorCarrera&idInscripcion=${idInscripcion}&idCarrera=${idCarrera}`
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
            const url = `${baseUrl}/?operacion=traerInscripcionesPorEstudiante&idUsuario=${idAlumno}`
            const res = await axios.get(url);
            const yaInscripto = await res.data.return.inscripcionesEstudiante;
            console.log("traerInscripcionesAlumno response ", JSON.stringify(yaInscripto))
            return yaInscripto
        } catch (err) {
            console.error(err)
        }
    }

    const altaInscripcionEstudiante = async (idUsuario, idInscripcion, idComision) => {
        try {
            console.log("llamando al servicio altaInscripcionEstudiante con idUsuario idInscripcion idComision", idUsuario, idInscripcion, idComision);
            const url = `${baseUrl}/?operacion=altaInscripcionEstudiante&idUsuario=${idUsuario}&idInscripcion=${idInscripcion}&idComision=${idComision}`
            const res = await axios.get(url);
            console.log("altaInscripcionEstudiante " + JSON.stringify(res))
            return res.data.return.estado
        } catch (err) {
            console.error(err)
        }
    }

    const bajaInscripcionEstudiante = async (idDetalleInscripcion) => {
        try {
            console.log("llamando al servicio bajaInscripcionEstudiante con idDetalleInscripcion " + idDetalleInscripcion)
            const url = `${baseUrl}/?operacion=bajaInscripcionEstudiante&idDetalleInscripcion=${idDetalleInscripcion}`
            const res = await axios.get(url);
            console.log("bajaInscripcionEstudiante " + JSON.stringify(res.data.return.estado))
            return res.data.return.estado

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