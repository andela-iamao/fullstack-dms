import React from 'react';
import UserCard from './UserCard';

export default function UsersList({ users, deleteUser }) {
  const emptyMessage = (
    <p>There are no users yet in the system.</p>
  );

  const usersList = (
    <div>
      {users.map(user => <UserCard user={user} key={user.id} deleteUser={deleteUser} />)}
    </div>
  );

  return (
    <div>
      {users.length === 0 ? emptyMessage : usersList}
    </div>
  );
}

UsersList.propTypes = {
  users: React.PropTypes.array.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
};
