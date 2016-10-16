import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import React, { Component } from 'react';

const styles = require('../Styles/Styles.js');
const constants = styles.constants;

// this seems illegal and wrong
const actionButtonStyle = StyleSheet.create({

  buttonStyle: {
    position: 'absolute'
  }
});

class ActionButton extends Component {
  render(){
    const newStyles = this.props.styles || {};
    return (
      <TouchableHighlight
        underlayColor={constants.actionColor}
        onPress={this.props.onPress} >
        <View style={[styles.action,newStyles.action]} >
          <Text style={styles.actionText}>{this.props.title}</Text>
      </View>
    </TouchableHighlight>
    );
  }
}




module.exports = ActionButton;
