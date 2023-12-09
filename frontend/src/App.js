// import Form from "./component/registration"
import Adminlist from "./adminlist";
import Adminedit from "./adminedit";
import Admin from "./admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/adminlist" element={<Adminlist />} />
        <Route path="/adminedit/:id" element={<Adminedit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
