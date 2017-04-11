import React from 'react';
import '../styles/styles.css';

class LandingPage extends React.Component {
  render() {
    return (
      <div id="hero">
        <div className="container" id="hero-text-container">
          <div className="row">
            <div className="col s12 center-align">
              <h1 id="hero-title" itemProp="description">
                <span className="bold" >{'Welcome to DMS    '}</span>
                <span className="thin">
                  a very efficient way for <br />
                you to manage your documents online</span>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="center-align">
                <a className="btn btn-large create-list-link hero-btn" href="/signup">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
