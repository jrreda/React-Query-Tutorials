import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

const fetchSuperHero = async ({ queryKey }) => {
  const heroId = queryKey[1];
  return await axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export default function useSuperHeroData({ heroId }) {
  const queryClient = useQueryClient();
  const { data, isLoading, error, isError, isFetching, refetch } = useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: fetchSuperHero,
    initialData: () => {
      const hero = queryClient.getQueryData("super-heroes")?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    }
  });

  return { data, isLoading, error, isError, isFetching, refetch }
}
