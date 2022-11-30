
import { Provider } from 'react-redux';  // React Redux Used
import  { Routes } from './routes/Routes'; // Routes Imported
import store  from "../src/redux/store" // Redux Store Imported
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Material UI Used
import '../src/assets/css/Main.css'  // Main Css Imported For Design

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
    ].join(',')
  }
});

// Main App Container
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
        height: '100vh'}} 
        >
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