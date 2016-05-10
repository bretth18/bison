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
import {Container, Header, Content, Footer, Title, Button, Icon, Card, CardItem } from 'native-base';
import ListComment from './ListComment';
import Firebase from 'firebase';

const styles = require('../Styles/Styles.js');
const constants = styles.constants;

class Settings extends Component {
  render(){
    return(
      <Container>
          <Header>
              <Title>bison.</Title>

          </Header>
          <Content>
         </Content>

          <Footer>
              <Title>made with <Icon name="ios-heart"/> in SF</Title>
          </Footer>
      </Container>
    );
  }

}



module.exports = Settings;
