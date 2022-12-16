import AppRoutes from "./Routes/Routes";
import { NavBarContext } from "./Components/contexts/NavBarContext";
import { useContext, useEffect } from "react";

function App() {
  useEffect(() => {
    alert(process.env.REACT_APP_TOKEN);
  }, []);

  const { contextIsLight } = useContext(NavBarContext);

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar a classe dark ou light */}
       
        <div className={contextIsLight ? `app light` : `app dark`}>
          Wesley Bruno Barbosa Silva
          <AppRoutes />
        </div>
      </>
    );
  }
  
  export default App;
  