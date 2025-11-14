//React Imports
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Layout Import
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'

// Page Import
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Features from './pages/Features/Features'


const App:React.FC = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/features" element={<Features/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App