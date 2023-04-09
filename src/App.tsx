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
import { Explore } from "./pages/manager/components/Explore";
import { YourPhotos } from "./pages/manager/components/YourPhotos";
import { Pending } from "./pages/manager/components/Pending";
import { Ready } from "./pages/manager/components/Ready";
import { CreateNew } from "./pages/manager/components/CreateNew";
import "react-toastify/dist/ReactToastify.css";

const Home = React.lazy(() => import("./pages/home"));
const Manager = React.lazy(() => import("./pages/manager"));

function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Router basename={import.meta.env.VITE_APP_PUBLIC_URL as string}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="manager" element={<Manager />}>
            <Route path="explore" element={<Explore />} />
            <Route path="boards" element={<YourPhotos />} />
            <Route path="new" element={<CreateNew />} />
            <Route path="pending" element={<Pending />} />
            <Route path="upload-onchain" element={<Ready />} />
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
}

export default App;
