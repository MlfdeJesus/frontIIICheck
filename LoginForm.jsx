import styles from "./Form.module.css";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import api from "../services/api";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { NavBarContext } from "./NavBarContext";

const LoginForm = () => {
  const [name, setUser] = useState("dentistaAdmin");
  const [password, setPassword] = useState("admin123");

  const navigate = useNavigate();
  const { fillUsetDataState, setIsLogado } = useContext(AuthContext);
  const { contextIsLight } = useContext(NavBarContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    auth();
    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
  };
  async function auth() {
    try {
      const response = await api.post("/auth", {
        username: name,
        password: password,
      });
      toast("Usuário logado com sucesso !", {
        type: "success",
        autoClose: 1000,
        transition: Zoom,
      });
      fillUsetDataState({
        token: response.data.token,
      });
      setIsLogado(true);

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (erro) {
      toast.error("Verifique suas informações novamente", {
        autoClose: 2000,
        transition: Zoom,
      });
    }
  }
  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container ${
          contextIsLight ? styles.card : styles.cardDark
        }`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              required
              value={name}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={name.length < 5 ? true : false}
            >
              Send
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginForm;
