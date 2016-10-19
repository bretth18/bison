import {
  View,
  Text, } from 'react-native';
import React, { Component } from 'react';

const styles = require('../Styles/Styles.js');

class StatusBar extends Component{
  render(){
    return(
      <View>
        <View style={styles.statusbar} />
        <View style={styles.navbar} >
          <Text style={styles.navbarTitle}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}


module.exports = StatusBar;
