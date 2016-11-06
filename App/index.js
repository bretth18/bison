/* this is the root navigator */
import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import store from './Store/Store';
import { Router, Scene } from 'react-native-router-flux';

/* SCENE COMPONENT IMPORTS */
import YakContainer from './Containers/YakContainer';
import YakViewContainer from './Containers/YakViewContainer';
import Settings from './Components/Settings';


const RouterWithRedux = connect()(Router);

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <RouterWithRedux>
          <Scene key="root" hideNavBar>
            <Scene key="YakContainer" component={YakContainer}
                   title="YakContainer" initial={true} hideNavBar />
            <Scene key="YakViewContainer" component={YakViewContainer}
                   title="YakViewContainer" hideNavBar />
            <Scene key="Settings" component={Settings}
                   title="Settings" hideNavBar />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

module.exports = App;
