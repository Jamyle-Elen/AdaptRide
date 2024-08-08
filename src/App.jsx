
import './App.css'
import Router from './routes/UI/route.jsx'
import 'boxicons/css/boxicons.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <Router/>
    <ToastContainer />
    </>
  )
}

export default App
