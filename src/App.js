import { useEffect, useState, useRef } from "react";
import "./App.css";
import StarshipCard from "./components/StarshipCard";
import { filterTheStarShipsBasedOnFilmsAppeared } from "./utils";
import Winner from "./images/winner-PhotoRoom.png";

const query = "https://swapi.dev/api/starships";
export default function App() {
  const [starShips, setStarShips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isAppStarted = useRef(false);

  const starShipCards = () => {
    if (!starShips?.length && isAppStarted.current) return <h1>No Starship data found</h1>;

    return (
      <div className="container">
        {starShips.map((starShip, i) => (
          <StarshipCard key={i} starShip={starShip} />
        ))}
      </div>
    );
  };

  useEffect(() =>{
    return () => {
      setStarShips([]);
      setIsLoading(false);
      isAppStarted.current = false;
    }
  }, []);

  const fetchTheStarShips = () => {
    if (starShips.length) return;
    isAppStarted.current = true;
    setIsLoading(true);
    fetch(query)
      .then((res) => res.json())
      .then((result) => {
        const { results } = result;
        const filteredData = filterTheStarShipsBasedOnFilmsAppeared([...results]);
        setIsLoading(false);
        setStarShips(filteredData);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  return (
    <div className="App">
      <h1>Star Wars</h1>
      <p>
        Results are filtered to Starships with a crew size less than 10 and
        sorted by crew size. The starship that has featured in most films will
        show a{" "}
        <img
          src={Winner}
          width="30"
          height="30"
          alt="Winner Cup"
        />
      </p>
      <section className="fetch-starships">
        <button onClick={fetchTheStarShips}>Get Starships</button>
      </section>
      {isLoading ? <h1>Loading...</h1> : starShipCards()}
    </div>
  );
}
