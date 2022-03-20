import React from 'react';
import ReactDOM from 'react-dom';

import { createTheme, ThemeProvider } from "@mui/material/styles"

import App from './App';

import { theme as fromConfigTheme } from '../../config'
const theme = createTheme(fromConfigTheme)

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  , document.getElementById('app')
);
