import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet} from 'react-native';
import React, { Component } from 'react';

import moment from 'moment';
import { Icon } from 'native-base';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    margin: 5
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    }
  },
  cardImage: {
    flex: 1
  },
  cardTitle: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 1,
    paddingBottom: 1,
  },
  cardContent: {
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 1,
    paddingBottom: 1,
  },
  cardAction: {
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',

  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9E9E9'
  }
});

class ListItem extends Component {

  setNativeProps (nativeProps) {
    this._root.setNativeProps(nativeProps);
  }
  render(){
    var displayTime = moment(this.props.item.time).format('dddd, MMMM Do YYYY, h:mm:ss a');
    return(
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={[styles.container, styles.card,]}>
          <CardTitle>
            <Text >{this.props.item.title}</Text>
          </CardTitle>
          <CardContent>
            <Text >{displayTime}</Text>
            <Text >{this.props.item.score}pts</Text>
          </CardContent>
          <CardContent style={{flexDirection:'flex-end'}}>
            <Icon name='ios-more' style={{alignItems:'flex-end', color:'black'}} />
          </CardContent>
        </View>
      </TouchableHighlight>
    );
  }
}


module.exports = ListItem;
