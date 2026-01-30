import { useQuery } from 'react-query'
import axios from 'axios'

const fetchUsers = async (email) => {
  return await axios.get(`http://localhost:4000/users/${email}`)
}

const fetchChannels = async (channelId) => {
  return await axios.get(`http://localhost:4000/channels/${channelId}`)
}

export default function DependantQueriesPage({ email }) {
  const { data: users } = useQuery({
    queryKey: ["users", email],
    queryFn: () => fetchUsers(email),
  });

  const channelId = users?.data.channelId;

  const { data: channels } = useQuery({
    queryKey: ["channels", channelId],
    queryFn: () => fetchChannels(channelId),
    enabled: !!channelId,
  });

  return (
    <div>
      <h1>Dependant Queries Page</h1>
      <h2>User: {users?.data.id}</h2>
      <h2>Channel: {channels?.data.id}</h2>
      <h2>Courses:</h2>
      <ul>
        {channels?.data?.courses.map((course) => (
          <li key={course}>{course}</li>
        ))}
      </ul>
    </div>
  )
}