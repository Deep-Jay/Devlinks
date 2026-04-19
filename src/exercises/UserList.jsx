import useFetch from "../hooks/useFetch";

function UserList() {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const {
    data: users,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users");
  // useEffect(() => {
  //   async function fetchUsers() {
  //     try {
  //       const res = await fetch("https://jsonplaceholder.typicode.com/users");
  //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //       const data = await res.json();
  //       setUsers(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchUsers();
  // }, []); // empty array — fetch once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;
