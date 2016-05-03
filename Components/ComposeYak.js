import React, {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  Navigator,
  Component,
  TouchableHighlight,
  TextInput,
} from 'react-native';
const styles = require('../Styles/Styles.js');
const constants = styles.constants;


import {Container, Content, InputGroup, Input, Icon } from 'native-base';

class ComposeYak extends Component {
    render() {
        return (
            <Content>​
                  <InputGroup borderType="underline" >
                      <Icon name={'ios-home'} color={'#384850'} />
                      <Input placeholder="Type your text here"  />
                  </InputGroup>
              </Content>



        );
    }
}

module.exports = ComposeYak;
