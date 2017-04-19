import React from 'react';
import { Link } from 'react-router';
import '../../styles/styles.css';

export default function UserCard({ user, deleteUser }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.Role.title}</td>
      <td>{user.createdAt.substr(0, 10)}</td>
      <td><Link to={`/user/${user.id}`}>Edit</Link></td>
      <td><a href="" onClick={() => deleteUser(document.id)}>Delete</a></td>
    </tr>
  );
}

UserCard.propTypes = {
  user: React.PropTypes.object.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
};
