import axios from 'axios';
import React, { useState } from 'react';

function CreateUser({ allData,setAllData }) {
  const [newUser, setNewUser] = useState([])
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addnewUser = async() => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      setAllData([...allData, response.data]);
      setNewUser({ name: '', username: '', email: '' ,phone:''});

    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='m-3'>
      <div className='row'>
        <div className='col-md-6'>
          <label >Name:</label>
          <input type='text' className='form-control'
            name='name'
            value={newUser.name}
            onChange={handleChange}
                  />
        </div>
        <div className='col-md-6'>
          <label>User Name:</label>
          <input type='text'
            name='username'
            value={newUser.username}
            onChange={handleChange}
            className='form-control' />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <label>Email:</label>
          <input type='text'
            name='email'
            value={newUser.email}
            onChange={handleChange}
            className='form-control' />
        </div>
        <div className='col-md-6 '>
          <label >Phone:</label>
          <input type='text'
            name='phone'
            value={newUser.phone}
            onChange={handleChange}
            className='form-control' />
        </div>
      </div>
      <div className='row'>
          </div>
          <button className='btn btn-outline-primary btn-block m-4' onClick={addnewUser} >Add New User</button>
    </div>
  );
}

export default CreateUser;