import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Auth/Login.jsx";
import APIList from "../components/ApiList.jsx";
import Register from "../components/Auth/Register.jsx";
import Home from "../components/HomePage.jsx";
import NotFound from "../components/NotFoundPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Main from "../components/Main/Main.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/get-apis"
          element={
            <Main>
              <ProtectedRoute>
                <APIList />
              </ProtectedRoute>
            </Main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
