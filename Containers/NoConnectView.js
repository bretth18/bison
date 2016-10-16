import {
 View,
 Text,
 ListView,
 TextInput,
 AsyncStorage,
 Alert,
 NetInfo } from 'react-native';

import React, { Component } from 'react';
import NativeTheme from '../Themes/myTheme';
import {Container, Header, Content, Footer, Title, Icon, Button} from 'native-base';

const styles = require('../Styles/Styles.js');




class NoConnectView extends Component {

  constructor(props) {
    super(props);
  }
  componentWillMount() {

  }

  componentDidMount() {
    this.listenForConnection();
  }

  listenForConnection() {
    NetInfo.isConnected.fetch().then(isConnected => {
      // set state based on connection status
      if (isConnected === 'online'){
        this.setState({
          connection: true
        });
      } else {
        this.setState({
          connection: false
        });
      }
    });

    function handleFirstConnectivityChange(isConnected) {
      console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
      if (isConnected === 'offline') {
        this.props.navigator.push({
          ident: 'NoConnectView',
        });
      } else if (isConnected === 'online') {
        this.props.navigator.push({
          ident: 'Yaks',
        });
      }
      NetInfo.isConnected.removeEventListener(
        'change',
        handleFirstConnectivityChange
      );
    }
    // event listener
    NetInfo.isConnected.addEventListener(
      'change',
      handleFirstConnectivityChange
    );
  }
  /* NAVIGATORS */
  goToSettings(){
    this.props.navigator.push({
      ident: 'Settings',
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <Header theme={NativeTheme}>
            <Title style={{alignSelf: 'flex-start', paddingLeft: 10}}>bison.</Title>
            <Button transparent style={{alignSelf: 'flex-end', paddingLeft: 260}}
                onPress={this.goToSettings.bind(this)}>
                  <Icon style={{alignSelf: 'flex-end', paddingLeft: 260}} name="ios-settings"/>
            </Button>
        </Header>

        <Footer theme={NativeTheme}>
          <Title>made with <Icon  style={{fontSize: 20}} name="md-heart"/> in SF</Title>
        </Footer>
      </View>
    );
  }

}



module.exports = NoConnectView;
