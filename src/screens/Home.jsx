import React, { useContext } from 'react'
import {
    Typography,
    Box
} from '@mui/material'
import { UserContext } from '../context/UserContext'



const Home = () => {
    const context = useContext(UserContext)
    const {user} = context
    return (
        <Box p={4}>

            {/*
            test userContext 
            <Typography variant="h4" style={{color: user.activo ? "blue" : "red"}}> Home </Typography> 
        */}
        <Typography variant="h4"> Home </Typography> 
        </Box>
    )
}

export default Home