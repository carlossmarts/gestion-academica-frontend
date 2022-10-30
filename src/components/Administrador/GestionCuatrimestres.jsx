import React from 'react'

import AltaCursadaOExamen from './AltaCursadaOExamen';
import ConsultaCursadasOExamenes from "./ConsultaCursadasOExamenes";
import Grid from "@mui/system/Unstable_Grid";

const GestionCuatrimestres = () => {
    return (
        <Grid container>
            <Grid item xs={10}>
                <ConsultaCursadasOExamenes idInstancia={1}/>
                <hr style={{width:"100%"}}/>
                <AltaCursadaOExamen origen={"cursada"}/>
            </Grid>
        </Grid>
    )
}

export default GestionCuatrimestres

