import { useState } from 'react'
import Login from './pages/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { UserProvider } from './context/UserContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#3f51b5',
    },
    background: {
      default: '#2b2b2b',
      paper: '#333'
    },
    text: {
      primary: '#fff',
      secondary: '#fff'
    }
  },
  
  typography: {
    fontFamily: 'Roboto, Arial',
    h1: {
      fontSize: '5rem',
      fontWeight: 500
    },
    button: {
      textTransform: 'none',
    }
  }
});

function App() {

  return (
    <>
    <UserProvider>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </UserProvider>
    </>
  )
}

export default App
