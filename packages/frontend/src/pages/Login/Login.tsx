import { Container, Typography, Stack, Button, TextField } from '@mui/material'
import { useUser } from '../../context/UserContext'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';

const Login = () => {

    const { loggedIn, login, logout, id } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [user, setUser] = useState({username: '', password: '', email: '', address: ''});
    const [updatingUser, setUpdatingUser] = useState(false);

    const fetchUserInfo = (id : number) => {
        axios.get(`http://localhost:3000/user/${id}`, {params: {username: username}})
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
                setAddress(response.data.address);
                setEmail(response.data.email);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const updateUser = () => {
        axios.put(`http://localhost:3000/user/${id}`, {
            username: username,
            password: password,
            email: email,
            address: address
        }).then((response) => {
            console.log(response.data);
            setUpdatingUser(false);
        }).catch((error) => {
            console.error(error);
        });
        localStorage.setItem('userToken', username);
        localStorage.setItem('passToken', password);
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
            {updatingUser ? (
            <>
            <Typography variant="h5" component="h2" align="center">
            <Container maxWidth="sm" sx={{ mt: 4, mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Stack spacing={2} alignItems="center">
                <TextField label="Username" variant="outlined" fullWidth onChange={(e)=>setUsername(e.target.value)} defaultValue={user.username}/>
                <TextField label="Password" type="password" variant="outlined" fullWidth onChange={(e)=>setPassword(e.target.value)}/>
                <TextField label="Email" variant="outlined" fullWidth onChange={(e)=>setEmail(e.target.value)} defaultValue={user.email}/>
                <TextField label="Address" variant="outlined" fullWidth onChange={(e)=>setAddress(e.target.value)} defaultValue={user.address}/>
                <Button variant="contained" color="primary" fullWidth onClick={() => updateUser()}>
                    Update User
                </Button>
                <Button variant="contained" color="secondary" fullWidth onClick={() => setUpdatingUser(false)}>
                    Go Back
                </Button>
            </Stack>
            </Container>
            </Typography>
            </>
            ) : (
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
                    ID: {id}
                </Typography>
            </Stack>
            </Container>
            <Container maxWidth="sm">
            <Button variant="contained" color="primary" onClick={()=>setUpdatingUser(true)} sx={{ mt: 4, mb:2}} fullWidth>
                    Update User Info
            </Button>
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
            )}
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