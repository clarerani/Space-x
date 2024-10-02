import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, Link } from "react-router-dom";

// Page Components
const Home = () => <h1>Welcome to Spacex Demo App</h1>;
const About = () => <h1>About Page</h1>;
const NotFound = () => <h1>404 - Page Not Found</h1>;
const Dashboard = () => <h1>Dashboard</h1>

// Navigation Component
const Navigation = () => (
  <nav>
    <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/dashboard">Dashboard</Link>
  </nav>
);

// Layout Component
const MainLayout = () => (
  <div>
    <header>
      <Navigation />
    </header>
    <main>
      <Outlet />
    </main>
    <footer>Footer content</footer>
  </div>
);

// Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "about", element: <About /> },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
]);

// Layout Component
const Layout = () => <RouterProvider router={router} />;

export default Layout;