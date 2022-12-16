import styles from "./Card.module.css";
import { useContext } from "react";
import { NavBarContext } from "./NavBarContext";

const Card = ({ nome, sobrenome }) => {
  const { contextIsLight } = useContext(NavBarContext);

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`card ${contextIsLight ? styles.card : styles.cardDark}`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${styles.CardBody}`}>
          {/* Na linha seguinte o link deverá utilizar a matricula, nome e sobrenome do dentista
          que vem da API */}
          <a href={`/dentist/MatriculaDoDentista`}>
            <h5 className={`card-title ${contextIsLight ? styles.title : styles.titleDark}`}>{" "}
            {nome} {sobrenome}</h5>
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;
