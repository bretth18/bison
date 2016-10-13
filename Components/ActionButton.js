import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import React, { Component } from 'react';

const styles = require('../Styles/Styles.js');
const constants = styles.constants;

class ActionButton extends Component {
  render(){
    return (
      <TouchableHighlight
        underlayColor={constants.actionColor}
        onPress={this.props.onPress}>
        <View style={styles.action} >
          <Text style={styles.actionText}>{this.props.title}</Text>
      </View>
    </TouchableHighlight>
    );
  }
}



module.exports = ActionButton;
