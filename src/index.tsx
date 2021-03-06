import React from 'react';
import ReactDOM from 'react-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins'
  },
  palette: {
    text: { primary: '#FFFFFF' },
    primary: { main: '#71B945' },
    error: { main: '#FF5757' },
    background: { default: '#2C254A', paper: '#3B3363' }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
