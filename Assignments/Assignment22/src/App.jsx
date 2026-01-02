import { useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setUsers(data);
  }

  return (
    <div>
      <button onClick={loadUsers}>Load Users</button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
