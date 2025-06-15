import { useTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { useAxiosCenterSetup } from './axios/useAxiosCenterSetup';

function App() {
  useAxiosCenterSetup();

  const theme = useTheme();
  const toastTheme = theme.palette.mode === 'dark' ? 'dark' : 'light';

  return (
    <>
    <AppRoutes />
    <ToastContainer position="bottom-right"  theme={toastTheme} autoClose={3000} hideProgressBar={true} />
    </>
  )
}

export default App
