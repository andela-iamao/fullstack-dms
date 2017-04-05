import React from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

class NavigationBar extends React.Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="right hide-on-med-and-down">
        <li><a href="#" onClick={this.logout}>Logout</a></li>
        <li><Link to="/new-document">Create Document</Link></li>
      </ul>
    );

    const guestLinks = (
      <ul className="right hide-on-med-and-down">
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/new-document">Create Document</Link></li>
      </ul>
    );

    return (
      <nav>
        <div className="nav-wrapper">
          <IndexLink to="/" class="brand-logo">DMS</IndexLink>

            {isAuthenticated ? userLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  logout: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
