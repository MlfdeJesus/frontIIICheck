import { useContext } from "react";
import styles from ".Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { NavBarContext } from "./NavBarContext";
import { AuthContext } from "../providers/AuthContext";

const Navbar = () => {

  const {contextIsLight, setContextIsLight} = useContext(NavBarContext);
  const { isLogado } = useContext(AuthContext);

  const navigate = useNavigate();
  
  function handleMode() {
    setContextIsLight(!contextIsLight);
  };

  function logout(){
    localStorage.clear();
    navigate("/Login");
  }

  return (
    <header className="sticky-top">
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar navbar-dark bg-dark ou navbar-light bg-light*/}
      <nav
        className={ contextIsLight ? `navbar navbar-expand-sm navbar-light bg-light` : `navbar navbar-expand-sm navbar-dark bg-dark`}
        aria-label="Third navbar example"
      >
        <div className="container">
          {/* Ao clicar, o usuário deve ser redirecionado a home, com react-router */}
          <Link to="/home" className={`navbar-brand ${styles.navbarBrand}`}>DH Odonto</Link>
         
         
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample03"
            aria-controls="navbarsExample03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarsExample03"
          >
            <ul className="navbar-nav mb-2 mb-sm-0">
              <li className={`nav-item ${styles.navBarLink}`}>
                {/* Ao clicar, o usuário deve ser redirecionado a home, com react-router */}
                <Link to="/home" className={`nav-link`}>Home</Link>
              </li>
              <li className={`nav-item ${styles.navBarLink}`}>
                
                {/* Se o usuário estiver logado, deverá aparecer um botão de logout
                que vai apagar o token do localstorage.
                Se o usuário estiver deslogado, um link fará um redirecionamento, com react-router,
                ao formulário de login
                O botão de logout deverá ser testado darkmode
                se sim, btn-dark, se não, btn-light */}
                {isLogado ? <button onClick={logout} className={contextIsLight ? `btn btn-light ${styles.btnLogout}` : `btn btn-dark ${styles.btnLogout}`}>
                  Logout 
                </button> : <Link to="/" className={`nav-link`}>Login</Link>}
              </li>
              <li className={`nav-item`}>
                {/* Ao ser clicado, esse botão mudará a aplicação para dark mode ou light mode.
                 Lembre-se de usar um estado no contexto para fazer essa alteração.
                 Na linha seguinte deverá ser feito um teste se a aplicação
                 está em dark mode e deverá utilizar o icone ☀ ou 🌙 e btn-dark ou btn-light*/}
                <button onClick={handleMode} data-testID="navbar"
                  className={contextIsLight ? `btn btn-dark ${styles.btnStyle}` : `btn btn-light ${styles.btnStyle}`}
                >
                  {contextIsLight ? `🌙` : `☀` }
                </button>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
