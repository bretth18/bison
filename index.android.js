

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View } from 'react-native';

import { Button, Card } from 'react-native-material-design';
import TopNav from './Components/ToolbarAndroid';
import Yaks from './Containers/Yaks';


class Awesomenativebase extends Component {

  render() {
    return (
      <View>
        <TopNav/>
        <Yaks />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Awesomenativebase', () => Awesomenativebase);
