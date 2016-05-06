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
  TextInput,
} from 'react-native';
import {Container, Header, Content, Footer, Title, Button, Icon, Card, CardItem, } from 'native-base';

import Firebase from 'firebase';

const styles = require('../Styles/Styles.js');
const constants = styles.constants;

var refs = Firebase;


class YakView extends Component {

  submitComment(){
    refs.push.appendToChild({
      comment: null,
      id: null,
      time: null,
    });
  }
  _returnToYaks(){
    console.log('fart');
    this.props.navigator.push({
      ident: "MainLayout"
    });

  }
  render(){
    // console.log(item);
    console.log(this.props.item);
    return(
      <Container>
          <Header>
              <Title>bison.</Title>
          </Header>
          <Content>
            <View>
                  <Text>{this.props.item.title}</Text>
                  <Text>{this.props.item.time}</Text>

                <Button info onPress={this._returnToYaks}>
                    Back to Yaks
                </Button>
            </View>
         </Content>

      </Container>
    );
  }
}







module.exports = YakView;
