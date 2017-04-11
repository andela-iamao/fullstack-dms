import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <nav className="transparent black-text" role="navigation">
      <div className="nav-wrapper container">
        <Link href="/" className="brand-logo">DMS</Link>
        {/*<Link href="#" data-activates="mobile-demo" className="button-collapse">
          <i className="material-icons" style={{color: 'grey'}}>menu</i>
        </Link>
        <ul className="side-nav" id="mobile-demo">
          <li><Link href="/">Home</Link></li>
          <li>
            {this.state.loggedIn === 'true'
              ? <a href="/profile" >Profile</a>
              : <a href="/auth">Login</a>
            }
          </li>
          <li>
            {this.state.loggedIn === 'true'
              ? <a href="/#" onClick={this.handleLogoutSubmit}>Logout</a>
              : <a href="/auth">Sign Up</a>
            }
          </li>
        </ul>*/}
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/signup">Sign up</Link></li>
        </ul>
      </div>
    </nav>
  );
};
