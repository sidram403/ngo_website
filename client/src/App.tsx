import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NGOPage from './pages/NGOPage'
import UserPage from './pages/UserPage'
import AdminDashboard from './pages/AdminDashboard'
import Landing from './pages/Landing'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
      <Route  path='/' element={<Landing />} />
        <Route  path='/dashboard' element={<AdminDashboard />} />
        <Route  path='/ngo' element={<NGOPage />} />
        <Route  path='/user' element={<UserPage />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
