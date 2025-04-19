import { Container, Typography, Stack, Button, InputLabel, TextField } from '@mui/material'
import { UserContext, useUser } from '../../context/UserContext'
import { useState } from 'react'

const Login = () => {

    const { loggedIn, login, logout } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
                
        {loggedIn ? (
        <>
            <Typography variant="h5" component="h2" align="center">
                Welcome back! You are logged in.
            </Typography>
        </>
        ) : (
        <>
            <Typography variant="h5" component="h2" align="center">
                You are not logged in
            </Typography>
        </>
        )}

        <Container maxWidth="sm" sx={{ mt: 4, mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Stack spacing={2} alignItems="center">
                <TextField label="Username" variant="outlined" fullWidth onChange={(e)=>setUsername(e.target.value)}/>
                <TextField label="Password" type="password" variant="outlined" fullWidth onChange={(e)=>setPassword(e.target.value)}/>
                <Button variant="contained" color="primary" fullWidth onClick={() => login(username, password)}>
                    Login
                </Button>
                <Button variant="contained" color="secondary" fullWidth onClick={logout}>
                    Logout
                </Button>
            </Stack>
        </Container>
        </>
    )
}

export default Login