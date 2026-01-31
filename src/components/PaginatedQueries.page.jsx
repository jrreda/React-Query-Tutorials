import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchColors = async (pageNumber) => {
  return await axios.get(`http://localhost:4000/colors?_per_page=2&_page=${pageNumber}`);
}

export default function PaginatedQueriesPage() {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, error, isError, isFetching } = useQuery({
    queryKey: ["colors", pageNumber],
    queryFn: () => fetchColors(pageNumber),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (data?.length === 0) {
    return <div>No colors found</div>;
  }

  return (
    <div>
      <h1>Paginated Queries Page</h1>
      <ul>
        {data?.data?.data.map((color) => (
          <li key={color.id}>{color.label}</li>
        ))}
      </ul>
      <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>Previous</button>
      <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === 4}>Next</button>
      {isFetching && <div>Fetching data...</div>}
    </div>
  )
}