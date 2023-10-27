import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReadData from './component/ReadData';
import CreateUser from './component/CreateUser';
import DeleteUser from './component/DeleteUser';
import EditUser from './component/EditUser';

function App() {
  const [allData, setAllData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setAllData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <div className="container">
        <ul className="nav nav-tabs mt-4">
          <li className="nav-item">
            <Link to='/' className='nav-link'>Read Data</Link>
          </li>
          <li className="nav-item">
            <Link to='/create' className='nav-link'>Create New User</Link>
          </li>
          <li className="nav-item">
            <Link to='/delete' className='nav-link'>Delete User</Link>
          </li>
          <li className="nav-item">
            <Link to='/edit' className='nav-link'>Edit User</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path='/' element={<ReadData allData={allData} />} />
        <Route path='/create' element={<CreateUser allData={allData} setAllData={setAllData} />} />
        <Route path='/delete' element={<DeleteUser allData={allData} setAllData={setAllData} />} />
        <Route path='/edit' element={<EditUser allData={allData} setAllData={setAllData} />} />
      </Routes>
    </Router>
  );
}

export default App;