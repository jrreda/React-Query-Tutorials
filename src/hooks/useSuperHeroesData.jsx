import { useQuery, useMutation } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = async () => {
  return await axios.get('http://localhost:4000/superheroes')
}

const addSuperHero = async (hero) => {
  return await axios.post('http://localhost:4000/superheroes', hero)
}

export default function useSuperHeroesData(onSuccess, onError, interval) {
  const { data, isLoading, error, isError, isFetching, refetch } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    // enabled: false,
    onSuccess,
    onError,
    refetchInterval: interval,
    refetchIntervalInBackground: true,
    // select: (data) => {
    //   return data.data.map((hero) => hero.name);
    // }
  });

  return { data, isLoading, error, isError, isFetching, refetch }
}


export function useAddSuperHeroData() {
  return useMutation(addSuperHero)
}