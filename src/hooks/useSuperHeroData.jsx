import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHero = async ({ queryKey }) => {
  const heroId = queryKey[1];
  return await axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export default function useSuperHeroData({ heroId }) {
  const { data, isLoading, error, isError, isFetching, refetch } = useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: fetchSuperHero,
  });

  return { data, isLoading, error, isError, isFetching, refetch }
}
