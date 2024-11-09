import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Auth/Login"
import Register from "../components/Auth/Register";
import ProtectedRoute from "../components/ProtectedRoute"
import InitialPage from "../components/InitialPage/InitialPage"
import NotFound from "../components/NotFountPage/NotFoundPage";
import Main from "../components/Main";
import Home from "../components/Home/";
import APIList from "../components/ApiList";
import InitialHome from "../components/Home/components/InitialHome/";
import ApiCreator from "../components/ApiCreator/";
import ApiEditor from "../components/ApiEditor"
import ApiResponses from "../components/ApiResponses/ApiResponses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<InitialPage />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/home"
          element={
            <Main>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </Main>
          }
        >
          <Route index element={<InitialHome />} />
          <Route path="get-apis" element={<APIList />}/>
          <Route path="*" element={<NotFound />}/>
          <Route path="create-api" element={<ApiCreator />}/>
          <Route path="edit-api/:id" element={<ApiEditor/>}/>
          <Route path="get-api/:id/responses" element={<ApiResponses/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
