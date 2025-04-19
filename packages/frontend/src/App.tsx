import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { UserProvider } from './context/UserContext';
import Register from './pages/Login/Register';
import Login from './pages/Login/Login'
import Journey from './pages/Journeys/Journey'
import Travel from './pages/Travels/Travel'

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/travel" element={<Travel />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </UserProvider>
    </>
  )
}

export default App
