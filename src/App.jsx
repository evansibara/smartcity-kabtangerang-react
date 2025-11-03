import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"; 
import "./App.css"; 

import Layout from "./components/Layout";
// LoadingSpinner tetap diimpor, tapi hanya digunakan untuk Fallback error/jika perlu di masa depan
import LoadingSpinner from "./components/LoadingSpinner"; 

// Lazy imports untuk semua halaman
const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Persona = lazy(() => import("./pages/Persona.jsx"));
const Event = lazy(() => import("./pages/Event.jsx"));
const Dimensi = lazy(() => import("./pages/Dimension.jsx"));
const SmartGovernance = lazy(() => import("./pages/SmartGovernance.jsx"));
const SmartLiving = lazy(() => import("./pages/SmartLiving.jsx"));
const SmartSociety = lazy(() => import("./pages/SmartSociety.jsx"));
const SmartEconomy = lazy(() => import("./pages/SmartEconomy.jsx"));
const SmartEnvironment = lazy(() => import("./pages/SmartEnvironment.jsx"));
const SmartBranding = lazy(() => import("./pages/SmartBranding.jsx"));
const Publication = lazy(() => import("./pages/Publication.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function App() {
  return (
    <Router 
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      
      {/* Suspense tunggal di sini. Fallback={null} karena Layout.jsx menangani visual loading */}
      <Suspense fallback={null}> 
        <Routes>
          {/* LAYOUT ROUTE: Semua rute anak akan memiliki Header, Footer, dan Logika Transisi */}
          <Route element={<Layout />}>
            
            {/* RUTE ANAK: Hanya panggil komponen Lazy Load */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/persona" element={<Persona />} />
            <Route path="/event" element={<Event />} />
            <Route path="/dimensi" element={<Dimensi />} />
            <Route path="/SmartGovernance" element={<SmartGovernance />} />
            <Route path="/publication" element={<Publication />} />
            <Route path="/SmartLiving" element={<SmartLiving />} />
            <Route path="/SmartSociety" element={<SmartSociety />} />
            <Route path="/SmartEconomy" element={<SmartEconomy />} />
            <Route path="/SmartEnvironment" element={<SmartEnvironment />} />
            <Route path="/SmartBranding" element={<SmartBranding />} />
            
            {/* Rute 404/NotFound */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;