import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoadingScreen from './components/common/LoadingScreen';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/settings/Profile';

function App() {
 
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>


      </Routes>
    </Router>
    </>
  )
}

export default App
