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
import {Container, Header, Content, Footer, Title, Button, Icon} from 'native-base';

import Firebase from 'firebase';

const styles = require('../Styles/Styles.js');
const constants = styles.constants;

var refs = Firebase;


class YakView extends Component {
  getInitialState(){
    console.log(this.props);
  }
  submitComment(){
    refs.push.appendToChild({
      comment: null,
      id: null,
      time: null,
    });
  }
  _returnToYaks(){
    console.log('fart');
  }
  render(){
    return(
      <View>
        <Text>{'ROUTING WORKS'}</Text>
          <Button info onPress={this._returnToYaks}>
              Back to Yaks
          </Button>
      </View>
    );
  }
}







module.exports = YakView;
