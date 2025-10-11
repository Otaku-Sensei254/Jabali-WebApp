// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Learning from "./pages/Learning";
import Navbar from "./Components/Navbar/Navbar";
import { AuthProvider, useAuth } from "./Components/Context/AuthContext";
import { ThemeProvider } from "./Components/Context/ThemeContext";
import Music from "./pages/Music";
import Profiles from "./pages/Profiles";
import Dashboard from "./pages/Dashboard";
import Footer from "./Components/Footer/Footer";
import { ChildProvider } from "./Components/Context/ChildContext";
import AuthPage from "./Components/Auth/AuthPage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/auth" replace />;
};

// Layout Component for authenticated routes
const AuthenticatedLayout = () => {
  return (
    <>
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

// Router Configuration
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/learning",
        element: <Learning />,
      },
      {
        path: "/music",
        element: <Music />,
      },
      {
        path: "/profiles",
        element: <Profiles />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

// Render Root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ChildProvider>
          <RouterProvider router={router} />
        </ChildProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);