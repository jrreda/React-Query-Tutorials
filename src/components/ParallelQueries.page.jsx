import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = async () => {
  return await axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = async () => {
  return await axios.get('http://localhost:4000/friends')
}

export default function ParallelQueriesPage() {
  const { data: superHeroes } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: () => fetchSuperHeroes(),
  });

  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: () => fetchFriends(),
  });

  console.log("superHeroes", superHeroes);
  console.log("friends", friends);

  return (
    <div>
      <h1>Parallel Queries Page</h1>
    </div>
  )
}