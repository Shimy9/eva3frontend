import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import NavBar from "./components/NavBar";
import MiniHeader from "./components/MiniHeader";
import Banner from "./components/Banner";
import Productos from "./components/Productos";
import Nosotros from "./components/Nosotros";
import LineaIzq from "./components/LineaIzq.jsx";
import Servicios from "./components/Servicios.jsx";
import LineaDer from "./components/LineaDer.jsx";
import FAQ from "./components/FAQ.jsx";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer.jsx";

function App() {
  const [productoSeleccionado, setProductoSeleccionado] = useState("");

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
              <div id="nosotros">
                <Nosotros />
              </div>
              <LineaIzq />
              <div id="productos">
                <Productos setProductoSeleccionado={setProductoSeleccionado} />
              </div>
              <LineaDer />
              <div id="servicios">
                <Servicios />
              </div>
              <LineaIzq />
              <div id="faq">
                <FAQ />
              </div>
              <LineaDer />
              <div id="contacto">
                <ContactForm producto={productoSeleccionado} />
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
