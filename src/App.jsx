import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import AdminScreen from "./AdminView/AdminScreen";
import ProtectedLayout from "./ProtectedLayout";
import RecordScreen from "./UserView/RecordScreen";
import TimeEnteries from "./UserView/TimeEnteries";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<ProtectedLayout />} path="/">
          <Route element={<Navigate to="/admin" />} index />
          <Route element={<RecordScreen />} path="record-screen" />
          <Route element={<TimeEnteries />} path="time-enteries" />
          <Route element={<AdminScreen />} path="admin" />
        </Route>
        <Route element={<Login />} path="login" exact />
        <Route element={<Signup />} path="signup" exact />
        <Route element={<Navigate to="/" />} path="*" />
      </Routes>
    </HashRouter>
  );
}

export default App;
