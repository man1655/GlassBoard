import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoadingScreen from './components/common/LoadingScreen';

function App() {
 
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
