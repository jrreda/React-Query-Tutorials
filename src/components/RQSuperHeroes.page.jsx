import { useState } from "react";
import useSuperHeroesData, { useAddSuperHeroData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

export default function RQSuperHeroesPage() {
  const [interval, setInterval] = useState(5000);
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    console.log("Performe side effect when data is fetched successfully", data);
    if (data?.data?.length > 3) {
      setInterval(0);
    }
  };
  const onError = (error) => {
    console.log("Performe side effect when data is fetched unsuccessfully", error);
    setInterval(0);
  };

  const { data, isLoading, error, isError, isFetching, refetch } = useSuperHeroesData(onSuccess, onError, interval);
  console.log("isLoading", isLoading);
  console.log("isFetching", isFetching);

  const { mutate: addSuperHero } = useAddSuperHeroData();

  const handleAddSuperHero = () => {
    console.log("name", name);
    console.log("alterEgo", alterEgo);
    addSuperHero({ name, alterEgo });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div>
      <h2>React Query - Super Heroes Page</h2>
      <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
        <button onClick={handleAddSuperHero}>Add Super Hero</button>
      </div>
      <button onClick={refetch}>Fetch Super Heroes</button>
      <ul>
        {data?.data.map((hero) => (
          <div key={hero.name}>
            <Link to={`/rq-super-hero/${hero.id}`}>{hero.name}</Link>
          </div>
        ))}
        {/* {data?.map((heroName) => (
          <li key={heroName}>{heroName}</li>
        ))} */}
      </ul>
    </div>
  );
}