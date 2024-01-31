import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Component/Signup/Signup';
import Home from './Component/Home/Home';



function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/contact" element='/' />
          <Route path="/Login" element='/' />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
