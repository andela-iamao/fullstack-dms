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
  children: React.PropTypes.object.isRequired,
};

export default App;
