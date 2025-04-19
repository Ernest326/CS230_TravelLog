import { Container, Typography, Stack, Button, InputLabel, TextField } from '@mui/material'
import { UserContext, useUser } from '../../context/UserContext'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';

const Login = () => {

    const { loggedIn, login, logout, id } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({username: '', password: '', email: '', address: ''});

    function fetchUserInfo(id : number) {
        axios.get(`http://localhost:3000/user/${id}`, {params: {username: username}})
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        if(loggedIn) {
            fetchUserInfo(id);
        }
    }, [loggedIn, id]);

    return (
        <>
                
        {loggedIn ? (
        <>
            <Typography variant="h5" component="h2" align="center">
                You are logged in.
            </Typography>
            <Container maxWidth="sm" sx={{ mt: 4, mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Stack spacing={2} alignItems="center">
                <Typography variant="h6" component="h2" align="center">
                    User Info:
                </Typography>
                <Typography variant="body1" component="p" align="center">
                    Username: {user.username}
                </Typography>
                <Typography variant="body1" component="p" align="center">
                    Email: {user.email}
                </Typography>
                <Typography variant="body1" component="p" align="center">
                    Address: {user.address}
                </Typography>
                <Typography variant="body1" component="p" align="center">
                    ID: {user.id}
                </Typography>
            </Stack>
            </Container>
            <Container maxWidth="sm">
            <Button variant="contained" color="primary" component={Link} to="/travel" sx={{ mt: 4, mb:2}} fullWidth>
                    View Travel Logs
            </Button>
            <Button variant="contained" color="primary" component={Link} to="/journey" sx={{mb: 2}} fullWidth>
                    View Journey Plans
            </Button>
            <Button variant="contained" color="secondary" onClick={logout} sx={{mb: 4 }} fullWidth>
                    Logout
            </Button>
            </Container>
        </>
        ) : (
        <>
            <Typography variant="h5" component="h2" align="center">
                You are not logged in
            </Typography>
            <Container maxWidth="sm" sx={{ mt: 4, mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Stack spacing={2} alignItems="center">
                <TextField label="Username" variant="outlined" fullWidth onChange={(e)=>setUsername(e.target.value)}/>
                <TextField label="Password" type="password" variant="outlined" fullWidth onChange={(e)=>setPassword(e.target.value)}/>
                <Button variant="contained" color="secondary" fullWidth onClick={() =>  {
                    login(username, password);
                }}>
                    Login
                </Button>
                <Button variant="contained" color="primary" fullWidth component={Link} to="/register">
                    Register
                </Button>
            </Stack>
        </Container>
        </>
        )}
        </>
    )
}

export default Login