import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  const [data, setData] = useState([]); // To store fetched data
  const [newData, setNewData] = useState({ name: '', email: '' }); // Data for new user
  const [updatedData, setUpdatedData] = useState({ id: '', name: '', email: '' }); // Data for updating a user
  const [loading, setLoading] = useState(true); // To show loading indicator
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetch data using GET method
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handleCreate = () => {
    // POST request to create new user
    axios
      .post('https://jsonplaceholder.typicode.com/users', newData)
      .then((response) => {
        setData([...data, response.data]);
        setNewData({ name: '', email: '' }); // Reset new data form
      })
      .catch(() => {
        setError('Error creating user');
      });
  };

  const handleUpdate = () => {
    // PUT request to update user
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${updatedData.id}`, updatedData)
      .then((response) => {
        const updatedDataList = data.map((user) =>
          user.id === updatedData.id ? response.data : user
        );
        setData(updatedDataList);
        setUpdatedData({ id: '', name: '', email: '' }); // Reset updated data form
      })
      .catch(() => {
        setError('Error updating user');
      });
  };

  const handleDelete = (id) => {
    // DELETE request to delete user
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setData(data.filter((user) => user.id !== id)); // Remove user from the list
      })
      .catch(() => {
        setError('Error deleting user');
      });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <h1>User Management</h1>

      <h2>Create User</h2>
      <input
        type="text"
        placeholder="Name"
        value={newData.name}
        onChange={(e) => setNewData({ ...newData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newData.email}
        onChange={(e) => setNewData({ ...newData, email: e.target.value })}
      />
      <button onClick={handleCreate}>Create</button>

      <h2>Update User</h2>
      <input
        type="number"
        placeholder="User ID"
        value={updatedData.id}
        onChange={(e) => setUpdatedData({ ...updatedData, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Updated Name"
        value={updatedData.name}
        onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Updated Email"
        value={updatedData.email}
        onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>

      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="actions">
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;