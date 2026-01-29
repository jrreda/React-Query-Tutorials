import { useState, useEffect } from "react";
import axios from "axios";

export default function SuperHeroesPage() {
  const [superHeroes, setSuperHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/superheroes").then((response) => {
      setSuperHeroes(response.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Normal - Super Heroes Page</h2>
      <ul>
        {superHeroes.map((hero) => (
          <li key={hero.id}>{hero.name}</li>
        ))}
      </ul>
    </div>
  );
}
