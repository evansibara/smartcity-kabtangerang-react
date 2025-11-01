import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

// Lazy imports
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Profile = lazy(() => import("./pages/Profile"));
const Persona = lazy(() => import("./pages/Persona"));
const Event = lazy(() => import("./pages/Event"));
const Dimensi = lazy(() => import("./pages/Dimension"));
const SmartGovernance = lazy(() => import("./pages/SmartGovernance"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Publication = lazy(() => import("./pages/Publication"));

// Loading Component
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Tambahkan di sini */}
      <div className="app">
        <Header />
        <main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/persona" element={<Persona />} />
              <Route path="/event" element={<Event />} />
              <Route path="/dimensi" element={<Dimensi />} />
              <Route path="/SmartGovernance" element={<SmartGovernance />} />
              <Route path="/publication" element={<Publication />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
