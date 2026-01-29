import { useParams } from "react-router-dom";
import useSuperHeroData from "../hooks/useSuperHeroData";

export default function RQSuperHeroPage() {
  const { heroId } = useParams();

  const { data, isLoading, error, isError, isFetching } = useSuperHeroData({ heroId });

  console.log("isFetching", isFetching);
  console.log("isLoading", isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>React Query - Super Hero Page</h2>
      <p>{data?.data.name} - {data?.data.alterEgo}</p>
    </div>
  );
}