import { Container, Typography, Stack, Button, TextField } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [bottomText, setBottomText] = useState('');

    function register() {
        axios.post('http://localhost:3000/user/register', {
            username: username,
            password: password,
            email: email,
            address: address
        }).then((response) => {
            console.log(response.data);
            setBottomText('User registered successfully!');
        }).catch((error) => {
            console.error(error);
            setBottomText('Error registering user: ' + error.message);
        });
    }

    return (
        <>
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Stack spacing={2} alignItems="center">
                <TextField label="Username" variant="outlined" fullWidth onChange={(e)=>setUsername(e.target.value)}/>
                <TextField label="Password" type="password" variant="outlined" fullWidth onChange={(e)=>setPassword(e.target.value)}/>
                <TextField label="Email" variant="outlined" fullWidth onChange={(e)=>setEmail(e.target.value)}/>
                <TextField label="Address" variant="outlined" fullWidth onChange={(e)=>setAddress(e.target.value)}/>
                <Button variant="contained" color="secondary" fullWidth onClick={() => register()}>
                    Register
                </Button>
                <Button variant="contained" color="primary" fullWidth component={Link} to="/">
                    Login
                </Button>
            </Stack>
        </Container>
        <Typography variant="h5" component="h2" align="center">
            {bottomText}
        </Typography>
        </>
    )
}

export default Register