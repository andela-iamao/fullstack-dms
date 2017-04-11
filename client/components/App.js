import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationBar from './common/NavigationBar';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavigationBar />
          <div className="container">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

export default App;
