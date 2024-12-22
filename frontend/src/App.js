import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage';
import Home from './pages/home';
import DashBoard from './pages/DashBoard';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/scan" element ={<Home />} />
        <Route path="/table" element ={<DashBoard />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
