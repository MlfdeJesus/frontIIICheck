import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import AuthProvider from "../providers/AuthContext";


const DentistaRouterTemplate = () => {
  return (
    <div>
      <AuthProvider>
          <Navbar/>
          <Outlet />
          {/* {children} */}
          <Footer/>
      </AuthProvider>
    </div>
  );
};

export default DentistaRouterTemplate;
