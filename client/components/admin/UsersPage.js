import React from 'react';
import UsersList from './UsersList';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchUsers, deleteUser } from '../../actions/adminActions';

class UsersPage extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <h1>Users List</h1>
        <UsersList 
          users={this.props.users} 
          deleteUser={this.props.deleteUser} />
      </div>
    );
  }
}

UsersPage.propTypes = {
  users: React.PropTypes.array.isRequired,
  fetchUsers: React.PropTypes.func.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    users: state.admin,
  };
}

export default connect(mapStateToProps, { fetchUsers, deleteUser })(UsersPage);
