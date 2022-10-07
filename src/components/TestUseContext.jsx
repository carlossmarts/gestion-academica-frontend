import React, { useContext } from 'react'
import Button from '@mui/material/Button'
import { UserContext } from '../context/UserContext'

const TestUseContext = () => {

    const {user, setUser} = useContext(UserContext)

    const toggle = ()=>{
        console.log(user.activo)
        setUser({...user, activo : !user.activo})
    }

    return (
        <Button variant="contained" onClick={toggle}>
            cambiar
        </Button>
    )
}

export default TestUseContext