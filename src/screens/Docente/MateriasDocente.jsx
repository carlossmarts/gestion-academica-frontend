import { Typography } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react';
import { useDocentePresenter } from '../../hooks/DocentePresenter'
import TablaMaterias from '../../components/Docente/TablaMaterias'
import Loader from '../../components/commons/Loader'
import { styles } from '../../styles/styles'
import { UserContext } from '../../context/UserContext';


const MateriasDocente = () => {
    const [materias, setMaterias] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useContext(UserContext)

    const { traerMateriasDocente } = useDocentePresenter()

    useEffect(() => {
        setLoading(true)
        traerMateriasDocente(user.idUsuario)
            .then((res) => {
                setLoading(false)
                setMaterias(res ?? [])
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            <Typography style={styles.title}> Materias Asignadas </Typography>
            {
                materias !== undefined && materias.length !== 0 ?
                    < TablaMaterias materias={materias} />
                    :
                    null
            }
            {
                loading ? <Loader /> : null
            }
        </>
    )
}

export default MateriasDocente