import React, { useEffect, useState } from 'react';
import User from './User';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <div className='users-block' key={user.id}>
        <User user={user} />
      </div>
    );
  });

  return (
    <>
      <div id='user-list-container'>
        <div id='explore-title-container'>
          <h1 id='explore-title'>EXPLORE USERS</h1>
        </div>
        <div id='user-blocks-container'>
          {userComponents}
        </div>
      </div>
    </>
  );
}

export default UsersList;
