import React from "react";
import "./App.css";
import Header from "./components/Header";
import Loading from "./components/common/Loading";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import NotFound from "./components/NotFound";

const Home = React.lazy(() => import("./pages/home"));
const Manager = React.lazy(() => import("./pages/manager"));

function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Router basename={import.meta.env.VITE_APP_PUBLIC_URL as string}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
}

export default App;
