import { useState } from "react";
import useSuperHeroesData from "../hooks/useSuperHeroesData";

export default function RQSuperHeroesPage() {
  const [interval, setInterval] = useState(5000);

  const onSuccess = (data) => {
    console.log("Performe side effect when data is fetched successfully", data);
    if (data?.length > 3) {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>React Query - Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Super Heroes</button>
      <ul>
        {/* {data?.data.map((hero) => (
          <li key={hero.id}>{hero.name}</li>
        ))} */}
        {data?.map((heroName) => (
          <li key={heroName}>{heroName}</li>
        ))}
      </ul>
    </div>
  );
}