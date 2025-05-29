import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";


import NavBar from "./components/NavBar";
import MiniHeader from "./components/MiniHeader";
import Banner from "./components/Banner"; 


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              
              <MiniHeader />
              <NavBar />
              <Banner />
            </>
          }
        />
        {/* Aquí puedes agregar más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;
