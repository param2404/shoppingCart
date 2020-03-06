import React from 'react';
import './App.css';
import Home from './components/Home.js';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
     primary: {
      main: '#ffc107',
      contrastText: '#ffffff',
    },
    typography: {
      fontFamily: 'Raleway, Arial',
      foneSize: '14px'
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme} > 
   <Home/>
   </ThemeProvider>
  );
}

export default App;
