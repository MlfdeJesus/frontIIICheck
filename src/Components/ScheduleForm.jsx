import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import styles from "./ScheduleForm.module.css";
import { NavBarContext } from "../contexts/NavBarContext";
import api from "../../services/api";

const ScheduleForm = () => {
  const { paciente, dentista, consulta, setConsulta } = useContext(AuthContext);
  const [agenda, setAgenda] = useState({
    paciente,
    dentista,
    dataConsulta: "12-04-2022",
  });
  //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
  //e pacientes e carregar os dados em 2 estados diferentes
//Nesse handlesubmit você deverá usar o preventDefault,
  //obter os dados do formulário e enviá-los no corpo da requisição 
  //para a rota da api que marca a consulta
  //lembre-se que essa rota precisa de um Bearer Token para funcionar.
  //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
  const { userData } = useContext(AuthContext);
  const [dentist, setDentist] = useState([]);
  const [pacient, setPacient] = useState([]);
  const [birthdate, setBirthdate] = useState("");
  const [postResult, setPostResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };
  async function postConsulta(data) {
    console.log(data);

    const postData = JSON.stringify({
      paciente: {
        matricula: data.patient,
      },
      dentista: {
        matricula: data.dentist,
      },
      dataHoraAgendamento: data.appointmentDate,
    });

    const headers = {
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
        'Accept': '*/*',
      }
    }

    try {
      const res = await api.post("/consulta", postData, headers);

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setPostResult(fortmatResponse(result));
      console.log(postResult);
      alert("Consulta agendada!")
    } catch (error) {
      alert("Erro " + error.response?.data || error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    postConsulta(data);
  };

  const { contextIsLight } = useContext(NavBarContext);
    return (
      <>
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div
          className={`text-center container ${
            contextIsLight ? styles.card : styles.cardDark
          }`}
        >
          <form onSubmit={handleSubmit}>
            <div className={`row ${styles.rowSpacing}`}>
              <div className="col-sm-12 col-lg-6">
                <label
                  htmlFor="dentist"
                  className={
                    contextIsLight ? styles.formLabel : styles.formLabelDark
                  }
                >
                  Dentist

                </label>
                <select
                  value={dentist.matricula}
                  onChange={(e) => {
                    setDentist(e.target.value);
                  }}
                  className="form-select"
                  name="dentist"
                  id="dentist"
                >

                  {/*Aqui deve ser feito um map para listar todos os dentistas*/}
                  {dentista.map((dentista) => (
                    <option key={dentista.matricula} value={dentista.matricula}>
                      {dentista.nome} {dentista.sobrenome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-12 col-lg-6">
                <label
                  htmlFor="patient"
                  className={
                    contextIsLight ? styles.formLabel : styles.formLabelDark
                  }
                >
                  Patient
                </label>
                <select
                  value={pacient.matricula}
                  onChange={(event) => setPacient(event.target.value)}
                  className="form-select"
                  name="patient"
                  id="patient"
                >
                  {/*Aqui deve ser feito um map para listar todos os pacientes*/}
                  {paciente?.map((paciente) => (
                    <option key={paciente.matricula} value={paciente.matricula}>
                      {paciente.nome} {paciente.sobrenome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`row ${styles.rowSpacing}`}>
              <div className="col-12">
                <label
                  htmlFor="appointmentDate"
                  className={
                    contextIsLight ? styles.formLabel : styles.formLabelDark
                  }
                >
                  Date
                </label>
                <input
                  value={birthdate}
                  onChange={(event) => setBirthdate(event.target.value)}
                  className="form-control"
                  id="appointmentDate"
                  name="appointmentDate"
                  type="datetime-local"
                />
              </div>
            </div>
            <div className={`row ${styles.rowSpacing}`}>
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
              <button
                className={
                  contextIsLight
                    ? `btn btn-light ${styles.button}`
                    : `btn btn-dark ${styles.button}`
                }
                type="submit"
              >
                Schedule
              </button>
            </div>
          </form>
        </div>
      </>
    );
  };

  export default ScheduleForm;
