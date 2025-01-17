import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage';
import Home from './pages/home';
import DashBoard from './pages/DashBoard';
import Devices from './components/Devices';
import ErrorPage from './components/ErrorPage';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/device' element={<Devices/>}/>
        <Route path="/" element={<Login/>} />
        <Route path="/scan" element ={<Home />} />
        <Route path="/table" element ={<DashBoard />} />
        <Route path="/devices" element={<Devices/>} />
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
