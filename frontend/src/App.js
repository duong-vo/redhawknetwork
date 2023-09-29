import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserSignIn from './components/user/UserSignIn';

const theme = createTheme({
  spacing: 8,
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserSignIn />
    </ThemeProvider>
  );
}

export default App;
