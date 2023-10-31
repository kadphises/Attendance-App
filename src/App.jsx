import Login from "./Auth/Login"
import Signup from "./Auth/SignUp"
import { Navigate, Route, Routes } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import Home from "./Auth/Home";
import ProtectedLayout from "./ProtectedLayout";


function App() {

  return (
    <HashRouter>
    <Routes>
    <Route element={<ProtectedLayout />} path="/">
    <Route element={<Home />} path="home" exact/>

      </Route>
        <Route element={<Login />} path="login" exact/>
        <Route element={<Signup />} path="signup" exact/>
      <Route element={<Navigate to="/login" />} path="*" />
    </Routes>
    </HashRouter>
  )
}

export default App
