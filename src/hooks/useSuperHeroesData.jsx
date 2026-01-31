import { useQuery, useMutation, useQueryClient } from 'react-query'
import { request } from '../utils/axios'

const fetchSuperHeroes = async () => {
  // return await axios.get('http://localhost:4000/superheroes')
  return await request({ url: '/superheroes' })
}

const addSuperHero = async (hero) => {
  // return await axios.post('http://localhost:4000/superheroes', hero)
  return await request({ url: '/superheroes', method: 'POST', data: hero })
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
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes"); // unnecessary network request
    //   queryClient.setQueryData("super-heroes", (oldData) => {
    //     return {
    //       ...oldData,
    //       data: [...oldData.data, data.data]
    //     }
    //   })
    // }
    onMutate: (newHero) => {
      // optimistically update the data
      queryClient.setQueryData("super-heroes", (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, { ...newHero, id: oldData.data.length + 1 }]
        }
      })
    },
    onError: (_error, _newHero, context) => {
      // rollback to the previous data
      queryClient.setQueryData("super-heroes", context.previousData)
    },
    onSettled: () => {
      // invalidate the query to get the latest data
      queryClient.invalidateQueries("super-heroes")
    }
  })
}