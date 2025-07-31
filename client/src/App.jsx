// import { BrowserRouter, Routes, Route } from "react-router-dom";
//  import Home from "./pages/Home.jsx";
//  import Header from "./components/Header.jsx";
// import Footer from "./components/Footer.jsx";
// import Bookings from "./pages/Bookings.jsx";
// import Contact from "./pages/Contact.jsx";
// import Rooms from "./pages/Rooms.jsx";
// import Explore from "./pages/Explore.jsx";
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     // Scroll to top when path changes
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: "instant" // For immediate scroll
//     });
    
//     // Optional: Disable browser's automatic scroll restoration
//     if (window.history.scrollRestoration) {
//       window.history.scrollRestoration = 'manual';
//     }
//   }, [pathname]);

//   return null;
// }

// export default function App() {


//   return (
//     <BrowserRouter>
//      <ScrollToTop /> {/* Add this right after BrowserRouter */}
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/Home" element={<Home />} />
//           <Route path="/explore" element={<Explore />} />
//           <Route path="/bookings" element={<Bookings />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path ="/rooms" element={<Rooms />} />
//         </Routes> 
//        <Footer />
//     </BrowserRouter>
//   );
// }
