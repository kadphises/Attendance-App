import Login from "./Auth/Login"
import Signup from "./Auth/SignUp"
import { Navigate, Route, Routes } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';


function App() {

  return (
    <HashRouter>
    <Routes>
        <Route element={<Login />} path="login" exact/>
        <Route element={<Signup />} path="signup" exact/>
      <Route element={<Navigate to="/login" />} path="*" />
    </Routes>
    </HashRouter>
  )
}

export default App
