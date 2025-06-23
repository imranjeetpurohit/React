import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track edit mode

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form");

    if (editingId) {
      // UPDATE
      const response = await fetch(
        `http://localhost:4000/api/users/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      alert(result.message);
      setEditingId(null); // Exit edit mode
    } else {
      // CREATE
      const response = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message);
    }

    setFormData({ firstName: "", lastName: "" });
    fetchUsers();
  };

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:4000/api/users");
    const data = await response.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    const response = await fetch(`http://localhost:4000/api/users/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    alert(result.message);
    fetchUsers();
  };

  const startEditing = (user) => {
    setFormData({ firstName: user.firstName, lastName: user.lastName });
    setEditingId(user._id);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>First Name: </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <br />

        <label>Last Name: </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">{editingId ? "Update" : "Submit"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({ firstName: "", lastName: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstName} {user.lastName}{" "}
            <button onClick={() => startEditing(user)}>Edit</button>{" "}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
