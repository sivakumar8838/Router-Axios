import React from 'react';

function ReadData({ allData }) {
  return (
    <div className="row">
      {allData.map((user) => (
        <div key={user.id} className='card col-8 col-md-4 col-lg-2 m-4 p-3 bg-info'>
          <div className='card-title'><h4>Name:{user.name}</h4></div>
          <div className='card-title'><h6>User Name: {user.username}</h6></div>
          <div className='card-title'>Email: {user.email}</div>
          <div>Phone: {user.phone}</div>
        </div>
      ))}
    </div>
  );
}

export default ReadData;