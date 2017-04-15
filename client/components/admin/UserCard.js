import React from 'react';
import { Link } from 'react-router';

export default function UserCard({ user, deleteUser }) {
  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{user.firstName}, {user.lastName}</span>
            <dl>
              <dt>ID</dt>
              <dd>{user.id}</dd>

              <dt>UserName</dt>
              <dd>{user.username}</dd>

              <dt>Email</dt>
              <dd>{user.email}</dd>

              <dt>Role</dt>
              <dd>{user.Role.title}</dd>

              <dt>Date Registered</dt>
              <dd>{user.createdAt}</dd>

            </dl>
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
