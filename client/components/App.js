/* eslint react/prefer-stateless-function: 0 */
/* eslint "require-jsdoc": 0 */
import React from 'react';
import NavigationBar from './common/NavigationBar';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <NavigationBar />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
