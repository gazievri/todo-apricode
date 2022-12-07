import "normalize.css";
import "./styles/global.sass";
import Header from "./layouts/Header/Header.tsx";
import Footer from "./layouts/Footer/Footer.tsx";
import Start from "./pages/Start/Start.tsx";
import Main from "./pages/Main/Main.tsx";
import { Routes, Route } from "react-router-dom";
import React from 'react';
import Register from './components/Register/Register.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';

const App: React.FC = () => {

  return (
    <div className="app">
      <Header />
      <Routes>
          <Route element={<Start />} path="/" />
          <Route element={<Main />} path="todos" />
          <Route element={<Register />} path="/register" />
          <Route element={<NotFound />} path="*" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
