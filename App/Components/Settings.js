import {
  View,
  Text,
  Image } from 'react-native';

import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import {Container, Header, Content, Footer, Title, Button, Icon } from 'native-base';
import { Card } from 'react-native-material-design';
import SettingsList from 'react-native-settings-list';

import NativeTheme from '../Themes/myTheme';
const styles = require('../Styles/Styles.js');


//const for icon
// const bisonIcon = require('../ios/BisonApp/Images.xcassets/AppIcon.appiconset/Icon-40@2x.png');

class Settings extends Component {
  constructor(props){
    super(props);
  }
  // function to handle navigation back
  _returnToYaks(){
    Actions.YakContainer();
  }
  // function to handle nav to feedback page
  _navToFeedback(){
    this.props.navigator.resetTo({
      name: 'Feedback'
    });
  }

  render(){
    return(
      <Container theme={NativeTheme}>
          <Header theme={NativeTheme}>
            <Button transparent onPress={this._returnToYaks.bind(this)}>
                <Icon name="ios-arrow-back" />
            </Button>
              <Title>bison.</Title>
          </Header>
          <Content>
            <View style={styles.container}>
              <Card>
                <Card.Body>
                  <Text>Bison</Text>
                  <Text>made by @bretth18</Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Text style={{fontWeight: 'bold'}}>Info text</Text>
                  <Text style={{fontStyle: 'italic'}}>

                    Powered by React-Native</Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Text style={{fontWeight: 'bold'}}>Version</Text>
                  <Text style={{fontStyle: 'italic'}}>pre-release0.0.1</Text>

                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Text style={{fontWeight: 'bold'}}>Questions?</Text>
                  <Text>support@bisonapp.co</Text>
                </Card.Body>
              </Card>

            </View>
         </Content>
          <Footer theme={NativeTheme}>
              <Title>made with <Icon  style={{fontSize: 20}} name="md-heart"/> in SF</Title>
          </Footer>
      </Container>
    );
  }

}



module.exports = Settings;
