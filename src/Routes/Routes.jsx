import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/index";
import Login from "../pages/Login";
import AuthProvider, { AuthContext } from "../providers/AuthContext";
import { useContext } from "react";
import DentistaRouterTemplate from "../template/DentistaRouterTemplate";
import DetailCard from "../pages/DetailCard";

const PrivateRoute = ({ children }) => {
  const { userData } = useContext(AuthContext);
  return userData.token ? children : <Navigate to={"/"} />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route path="/home" element={<DentistaRouterTemplate />}>
              <Route
                path=""
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
            </Route>
            {/* dentista?matricula=c3e6cf30-dccc-4e21-935a-8efe9344677e */}
            <Route path="/dentist" element={<DentistaRouterTemplate />}>
              <Route
                path=":matricula"
                element={
                  <PrivateRoute>
                    <DetailCard />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
