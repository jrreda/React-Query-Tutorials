import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = async () => {
  return await axios.get("http://localhost:4000/superheroes");
};

export default function RQSuperHeroesPage() {
  const { data, isLoading, error, isError, isFetching } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
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
      <ul>
        {data?.data.map((hero) => (
          <li key={hero.id}>{hero.name}</li>
        ))}
      </ul>
    </div>
  );
}