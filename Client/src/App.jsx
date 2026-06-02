/** @format */

import React, { useEffect, useState } from "react";
import Home from "./pages/Home.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import { getCurrentUser } from "./services/api.js";
import { useDispatch, useSelector } from "react-redux";
import Notes from "./pages/Notes.jsx";
import History from "./pages/History.jsx";
import Pricing from "./pages/Pricing.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFailed from "./pages/PaymentFailed.jsx";
import About from "./pages/About.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

export const ServerUrl = "https://exam-io.onrender.com";

const App = () => {
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    getCurrentUser(dispatch).finally(() => setAuthReady(true));
  }, [dispatch]);

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={!userData ? <Navigate to="/auth" /> : <Home />}
        />

        <Route
          path="/auth"
          element={userData ? <Navigate to="/" /> : <Auth />}
        />

        <Route
          path="/history"
          element={userData ? <History /> : <Navigate to="/auth" />}
        />

        <Route
          path="/notes"
          element={userData ? <Notes /> : <Navigate to="/auth" />}
        />

        <Route
          path="/pricing"
          element={userData ? <Pricing /> : <Navigate to="/auth" />}
        />

        <Route
          path="/about"
          element={userData ? <About /> : <Navigate to="/auth" />}
        />

      <Route
          path="/payment-success"
          element={userData ? <PaymentSuccess /> : <Navigate to="/auth" />}
        />


      <Route
          path="/payment-failed"
          element={userData ? <PaymentFailed /> : <Navigate to="/auth" />}
        />


      </Routes>

    </>
  );
};

export default App;
