import React from 'react';
import { Link } from 'react-router';
import '../../styles/styles.css';


export default function UserCard({ user, deleteUser }) {
  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{user.firstName}, {user.lastName}</span>
            <table>
              <tr>
                <td className="title">ID: </td>
                <td className="text">{user.id}</td>
              </tr>
              <tr>
                <td className="title">UserName: </td>
                <td className="text">{user.username}</td>
              </tr>
              <tr>
                <td className="title">Email:</td>
                <td className="text">{user.email}</td>
              </tr>
              <tr>
                <td className="title">Role: </td>
                <td className="text">{user.Role.title}</td>
              </tr>     
              <tr>
                <td className="title">Signup Date:</td>
                <td className="text">{user.createdAt}</td>
              </tr>
            </table>
          </div>
          <div className="card-action">
            <Link to={`/user/${user.id}`}>Edit</Link>
            <a href="#" onClick={() => deleteUser(user.id)}>Delete</a>
          </div>
        </div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: React.PropTypes.object.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
};
