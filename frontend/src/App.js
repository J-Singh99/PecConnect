import React from 'react';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
function App() {

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div>
          <Main/>
        </div>
      </BrowserRouter>
    </ThemeProvider>
    
    
  );
}

export default App;
