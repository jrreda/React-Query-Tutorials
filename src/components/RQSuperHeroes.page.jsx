import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = async () => {
  return await axios.get("http://localhost:4000/superheroes");
};

export default function RQSuperHeroesPage() {
  const [interval, setInterval] = useState(3000);

  const onSuccess = (data) => {
    console.log("Performe side effect when data is fetched successfully", data);
    if (data.data.length > 3) {
      setInterval(0);
    }
  };
  const onError = (error) => {
    console.log("Performe side effect when data is fetched unsuccessfully", error);
    setInterval(0);
  };

  const { data, isLoading, error, isError, isFetching, refetch } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    // enabled: false,
    onSuccess,
    onError,
    refetchInterval: interval,
    refetchIntervalInBackground: true,
  });

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
        {data?.data.map((hero) => (
          <li key={hero.id}>{hero.name}</li>
        ))}
      </ul>
    </div>
  );
}