import React, {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  Navigator,
  Component,
  ListView,
  AlertIOS,
  TextInput } from 'react-native';
import {Container, Header, Content, Footer, Title, Button, Icon, Card, CardItem, Thumbnail, Image } from 'native-base';
import StatusBar from './StatusBar';
import SettingsList from 'react-native-settings-list';

const styles = require('../Styles/Styles.js');
const constants = styles.constants;

class Settings extends Component {
  // function to handle navigation back
  _returnToYaks(){
    this.props.navigator.resetTo({
      ident: 'MainLayout'
    });
  }

  render(){
    return(
      <Container>
          <Header>
            <Button transparent onPress={this._returnToYaks.bind(this)}>
                <Icon name="ios-arrow-left" />
            </Button>
              <Title>bison.</Title>
          </Header>
          <Content>
              <Text>Bison</Text>
              <Text>made by @bretth18</Text>


         </Content>

          <Footer>
              <Title>made with <Icon name="ios-heart"/> in SF</Title>
          </Footer>

      </Container>
    );
  }

}



module.exports = Settings;
