import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../components/Auth/Login.jsx';
import APIList from '../components/ApiList.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/get-apis" element={<APIList />} />
        <Route path="*" element={<Login />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
