import { Route, Routes } from "react-router-dom";

// import pages
import HomePage from "./pages/HomePage";

import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/me" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
