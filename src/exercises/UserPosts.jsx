import { useState, useEffect } from "react";

function UserPosts({ userId }) {
  // userId comes as a prop
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset state before each new fetch
    setLoading(true);
    setError(null);
    setPosts([]);

    async function fetchPosts() {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [userId]); // re-fetches every time userId changes

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}

export default UserPosts;
