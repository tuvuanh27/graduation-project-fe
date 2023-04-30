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
import { MyPhotos } from "./pages/manager/components/MyPhotos";
import { Pending } from "./pages/manager/components/Pending";
import { Ready } from "./pages/manager/components/Ready";
import { CreateNew } from "./pages/manager/components/CreateNew";
import "react-toastify/dist/ReactToastify.css";
import { NftDetail } from "./pages/manager/components/NftDetail";
import { OnSale } from "./pages/manager/components/OnSale";

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
            <Route path="on-sale" element={<OnSale />} />
            <Route path="my-photos" element={<MyPhotos />} />
            <Route path="upload-new" element={<CreateNew />} />
            <Route path="pending" element={<Pending />} />
            <Route path="ready-onchain" element={<Ready />} />
            <Route path="image-detail/:id" element={<NftDetail />} />
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
}

export default App;
