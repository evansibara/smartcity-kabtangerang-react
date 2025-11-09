import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import "./App.css";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <Router
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <AppRouter />
    </Router>
  );
}

export default App;