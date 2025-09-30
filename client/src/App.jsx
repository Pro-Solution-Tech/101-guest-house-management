import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./pages/Contact.jsx";
import Rooms from "./pages/Rooms.jsx";
import Explore from "./pages/Explore.jsx";
import AdminNavbar from "./components/AdminHeader.jsx";
import AdminViewRooms from "./pages/AdminViewRooms.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminCreateRoom from "./pages/AdminCreateRoom.jsx";
import AdminSignIn from "./pages/AdminSignIn.jsx";
import PrivateRoute from "./privateRoute.jsx";
import AdminUpdateRoom from "./pages/AdminUpdateRoom.jsx";
// import Laundry from "./pages/Laundry.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    if (location.pathname === '/admin') {
      setCurrentPage('dashboard');
    } else if (location.pathname === '/admin/create-room') {
      setCurrentPage('create-room');
    } else if (location.pathname === '/admin/view-rooms') {
      setCurrentPage('view-rooms');
    } else if (location.pathname.startsWith("/admin/update-room")) {
      setCurrentPage("update-room");
    }
  }, [location.pathname]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    switch (page) {
      case 'dashboard':
        navigate('/admin');
        break;
      case 'create-room':
        navigate('/admin/create-room');
        break;
      case 'view-rooms':
        navigate('/admin/view-rooms');
        break;
      default:
        navigate('/admin');
    }
  };

  return (
    <>
      <ScrollToTop />

      {!isAdminRoute && (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/sign-in" element={<AdminSignIn />} />
            {/* <Route path="/laundry" element={<Laundry />} /> */}

            {/* Catch-all guest route -> Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </>
      )}

      {isAdminRoute && (
        <AdminNavbar currentPage={currentPage} onNavigate={handleNavigate}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/create-room" element={<AdminCreateRoom />} />
              <Route path="/admin/view-rooms" element={<AdminViewRooms />} />
              <Route path="/admin/update-room/:roomId" element={<AdminUpdateRoom />} />

              {/* Catch-all admin route -> Dashboard */}
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>
          </Routes>
        </AdminNavbar>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
