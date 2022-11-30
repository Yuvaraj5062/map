
import { Provider } from 'react-redux';
import  { Routes } from './routes/Routes';
import store  from "../src/redux/store"

import { createTheme, ThemeProvider } from '@mui/material/styles';

import '../src/assets/css/Main.css'

import Directions from "./components/Directions/DirectionsIndex";


const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
    ].join(',')
  }
});

function App() {
  return (
    
    <div className='font_class'
    style={{
      fontFamily: 'Montserrat !important' ,
    backgroundColor:"white",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  color:"#777E84",
  width: '100vw',
  height: '100vh'}} >

<ThemeProvider theme={theme}>
        <div className="App">
        <Provider store={store}>
       <Routes></Routes>
       </Provider>
        </div>
      </ThemeProvider>

    </div>
  );
}
export default App;