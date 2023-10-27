import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [allData, setAllData] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', username: '', email: '', phone: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [editedUserData, setEditedUserData] = useState({ name: '', username: '', email: '' });

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setAllData(response.data);
    } catch (error) {
      console.log(error.response.headers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUser = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      setAllData([...allData, response.data]);
      setNewUser({ name: '', username: '', email: '', phone : '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditedUserData({ name: user.name, username: user.username, email: user.email, phone: user.phone});
  };

  const saveEditedUser = async () => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, editedUserData);

      setAllData((prevData) => {
        return prevData.map((user) => (user.id === response.data.id ? response.data : user));
      });

      setEditingUser(null);
      setEditedUserData({ name: '', username: '', email: '', phone : ''});
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete('https://jsonplaceholder.typicode.com/users/${userId}');
      setAllData(allData.filter((user) => user.id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <div className='add-user-form'>
        <input
          type='text'
          name='name'
          placeholder='Name'
          className='form-control lg-5'
          value={newUser.name}
          onChange={handleChange}
        />
        <input
          type='text'
          name='username'
          placeholder='Username'
          className='form-control lg-5 '
          value={newUser.username}
          onChange={handleChange}
        />
        <input
          type='text'
          name='email'
          placeholder='Email'
          className='form-control lg-5 '
          value={newUser.email}
          onChange={handleChange}
        />
        <input
            type='text'
            name='phone'
            placeholder='Phone Number'
           className='form-control lg-5'
            value={newUser.phone}
            onChange={handleChange}
        />
        <button className='btn btn-primary' onClick={handleAddUser}>Add User</button>
      </div>
      {allData.map((user) => (
  <div className='card' key={user.id}>
    <div className='card-body'>
      <h5 className='card-title'>Name : {user.name}</h5>
      <h6 className='card-subtitle mb-2'>Username : {user.username}</h6>
      <p className='card-text'>Email : {user.email}</p>
      <p className='card-text'>Phone : {user.phone}</p>
      <button className='btn btn-danger mt-2' onClick={() => handleDeleteUser(user.id)}>Delete</button>
      <button className='btn btn-secondary ml-2 mt-2' onClick={() => handleEditUser(user)}>Edit</button>
    </div>
  </div>
      ))}

    {editingUser && (
      <div className='edit-form mt-3'>
        <input
          type='text'
          name='name'
          placeholder='Name'
          className='form-control'
          value={editedUserData.name}
          onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
        />
        <input
          type='text'
          name='username'
          placeholder='Username'
          className='form-control'
          value={editedUserData.username}
          onChange={(e) => setEditedUserData({ ...editedUserData, username: e.target.value })}
        />
        <input
          type='text'
          name='email'
          placeholder='Email'
          className='form-control'
          value={editedUserData.email}
          onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
        />
        <input
          type='text'
          name='phone'
          placeholder='phone'
          className='form-control'
          value={editedUserData.phone}
          onChange={(e) => setEditedUserData({ ...editedUserData, phone: e.target.value })}
        />
        <button className='btn btn-success mt-2' onClick={saveEditedUser}>Save</button>
      </div>
    )}
  </div>
);
}

export default App;