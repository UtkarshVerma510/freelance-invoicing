import DashBoard from "./pages/DashBoard"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Signup/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><DashBoard/></ProtectedRoute>} />
    </Routes>
  )
}

export default App
