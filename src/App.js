import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
