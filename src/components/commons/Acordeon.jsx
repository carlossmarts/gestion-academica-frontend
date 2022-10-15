import React, { useState } from 'react'
import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails, 
    Grid, 
    Container,
    Box
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




const Acordeon = (props) => {

    const {
        icono,
        titulo,
        ancho,
        children,
        forcedExpanded
    } = props

    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <>
        <Container maxWidth={ancho}>
          
            <Accordion square style={styles.acordeon} expanded={forcedExpanded || expanded === 'panel'} onChange={handleChange('panel')}>
                <AccordionSummary
                    style={styles.panelHeader}
                    expandIcon={<ExpandMoreIcon />}
                    id="summary"
                    >
                    <Grid container alignItems="center">
                        <Box style={styles.icono} alignItems="center">
                            {icono}
                        </Box>
                        <Typography variant="body1" color="primary" style={styles.titulo}>
                            {titulo}
                        </Typography>  
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion>
        </Container>
        </>
    )
}

export default Acordeon


const styles = {
    acordeon: {
        border: "1px solid rgba(0, 0, 0, .125)",
        borderRadius: "6px"

    },
    titulo: {
        padding: "10px",
        fontWeight: "bold",
        color: "#eee",
        fontFamily: "Arial,Helvetica,sans-serif"
    },
    panelHeader: {
        backgroundColor: blue[600],
        minHeight: 16,
        height: '42px',
        '&$expanded': {
            minHeight: 16,
        }
    },
    icono:
    {
        fontSize:20,
        color: blue[900]
    }
};