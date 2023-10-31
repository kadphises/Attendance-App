import Login from "./Auth/Login"
import Signup from "./Auth/SignUp"
import { Navigate, Route, Routes } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';


function App() {

  return (
    <HashRouter>
    <Routes>
        <Route element={<Login />} path="login"/>
        <Route element={<Signup />} path="signup"/>
      <Route element={<Navigate to="/login" />} path="*" />
    </Routes>
    </HashRouter>
  )
}

export default App
