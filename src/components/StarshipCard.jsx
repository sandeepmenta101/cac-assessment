import styles from "./styles.module.css";

import Winner from "../images/winner-PhotoRoom.png";

export default function StarshipCard({ starShip }) {
  return (
    <section className={styles.card}>
      <header>
        <h2>{starShip.name}</h2>
        {starShip.maximumTimeAppeared && (
          <img
            src={Winner}
            width="30"
            height="30"
            alt="Winner Cup"
          />
        )}
      </header>
      <main>
        <article>
          <h3>Model</h3>
          <h4>{starShip.model}</h4>
        </article>
        <article>
          <h3>No of Films</h3>
          <h4>{starShip.films.length}</h4>
        </article>
      </main>
    </section>
  );
}
