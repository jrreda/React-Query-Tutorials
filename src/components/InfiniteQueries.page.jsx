import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Fragment } from "react";

const fetchColors = async ({ pageParam = 1 }) => {
  return await axios.get(`http://localhost:4000/colors?_per_page=2&_page=${pageParam}`);
}

export default function InfiniteQueriesPage() {
  const { data, isLoading, error, isError, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length >= 4) {
        return undefined;
      }
      return pages.length + 1;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Infinite Queries Page</h1>
      <ul>
        {data?.pages.map((group, index) => (
          <Fragment key={index}>
            {group.data.data.map((color) => (
              <li key={color.id}>{color.label}</li>
            ))}
          </Fragment>
        ))}
      </ul>
      <button onClick={() => fetchNextPage() } disabled={!hasNextPage}>Load more</button>
      {isFetching && !isFetchingNextPage && <div>Fetching data...</div>}
    </div>
  )
}