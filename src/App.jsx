import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

import Layout from "./components/Layout";
import PageLoader from "./components/PageLoader.jsx";

// Lazy imports untuk semua halaman
const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Persona = lazy(() => import("./pages/Persona.jsx"));
const Event = lazy(() => import("./pages/Event.jsx"));
const Dimensi = lazy(() => import("./pages/Dimension.jsx"));
const SmartGovernance = lazy(() => import("./pages/explore dimensions/SmartGovernance.jsx"));
const SmartLiving = lazy(() => import("./pages/explore dimensions/SmartLiving.jsx"));
const SmartSociety = lazy(() => import("./pages/explore dimensions/SmartSociety.jsx"));
const SmartEconomy = lazy(() => import("./pages/explore dimensions/SmartEconomy.jsx"));
const SmartEnvironment = lazy(() => import("./pages/explore dimensions/SmartEnvironment.jsx"));
const SmartBranding = lazy(() => import("./pages/explore dimensions/SmartBranding.jsx"));
const Publication = lazy(() => import("./pages/Publication.jsx"));
const NotFound = lazy(() => import("./components/NotFound.jsx"));

function App() {

  return (
    <Router
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />

      {/* Suspense dengan PageLoader sebagai fallback untuk semua lazy-loaded pages */}
      <Suspense fallback={<PageLoader />}>
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

          </Route>

          {/* Rute 404/NotFound tanpa Layout (tanpa Header dan Footer) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;