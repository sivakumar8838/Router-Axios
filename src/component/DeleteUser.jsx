import axios from 'axios'
import React from 'react'

function DeleteUser({ allData,setAllData }) {
     
  const  handleDelete = async(userid) => {
      try {
          const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${userid}`)
          setAllData(allData.filter(user=>user.id!=userid))
      } catch (error) {
          console.log(error)
      }
  }
  return (
    <div>  <div className="row">
    {allData.map((user) => (
      <div key={user.id} className='card col-8 col-md-4 col-lg-2 m-4 p-4 bg-info'>
          <div className='card-title'><h4>Name: {user.name}</h4></div>
            <div className='card-title'><h5>User Name: {user.username}</h5></div>
            <div className='card-title'>Email:{user.email}</div>
            <div>Phone: {user.phone}</div>
           <div> <button  className='m-4 btn btn-outline-danger' onClick={()=>handleDelete(user.id)}>Delete</button></div>
        </div>
    ))}      
  </div></div>
  )
}

export default DeleteUser