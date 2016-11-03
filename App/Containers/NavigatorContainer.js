import  {  Navigator, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import YakContainer from './YakContainer';

class NavigatorContainer extends Component {

  constructor(props){
    super(props);
  }

  renderScene(route, navigator) {
    let Component = route.component;

    return (
      <Component navigator={navigator} route={route} />
    );
  }

  // configureScene(route) {
  // }
  render() {
    return (
      <Navigator
        ref='navigator'
        style={styles.navigator}
        renderScene={this.renderScene}
        initialRoute={{
          component: YakContainer,
          name: 'Yak'
        }}
        />
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

export default NavigatorContainer;
