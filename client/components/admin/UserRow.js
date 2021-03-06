import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditUserRole from './EditUserRole';
import * as adminActions from '../../actions/adminActions';

class UserRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Object.assign({}, props.user),
    };

    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    $('select').material_select();
  }
  onChange(event) {
    event.preventDefault();
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({ user });
    this.props.actions.updateUser(user);
  }

  render() {
    const { user, deleteUser, auth } = this.props;
    return (
      <tr>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{auth.user.UserId !== user.id ?
          <EditUserRole
            value={parseInt(this.state.user.RoleId, 10)}
            onChange={this.onChange} /> :
          <span>{user.Role.title}</span>
          }
        </td>
        <td>{user.createdAt.substr(0, 10)}</td>
        <td>{auth.user.RoleId !== user.RoleId &&
          <a href="" onClick={() => deleteUser(user.id)}>Delete</a>}</td>
      </tr>
    );
  }
}

UserRow.propTypes = {
  user: React.PropTypes.object.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(adminActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(UserRow);
